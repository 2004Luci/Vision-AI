import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { DeviceEventEmitter, StyleSheet, type LayoutChangeEvent, View } from 'react-native';

type Detection = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type ViewSize = {
  width: number;
  height: number;
};

type DetectionOverlayProps = {
  enabled?: boolean;
};

const MODEL_SIZE = 640;
const MAX_RENDER_BOXES = 20;

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return value;
};

const normalizeDetections = (payload: unknown): Detection[] => {
  if (!Array.isArray(payload)) return [];

  const normalized: Detection[] = [];
  for (const item of payload) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const x1 = toFiniteNumber(record.x1);
    const y1 = toFiniteNumber(record.y1);
    const x2 = toFiniteNumber(record.x2);
    const y2 = toFiniteNumber(record.y2);
    if (x1 == null || y1 == null || x2 == null || y2 == null) continue;
    normalized.push({ x1, y1, x2, y2 });
  }

  return normalized;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const mapDetectionToBox = (detection: Detection, viewSize: ViewSize) => {
  const scaleX = viewSize.width / MODEL_SIZE;
  const scaleY = viewSize.height / MODEL_SIZE;

  const left = clamp(Math.min(detection.x1, detection.x2) * scaleX, 0, viewSize.width);
  const right = clamp(Math.max(detection.x1, detection.x2) * scaleX, 0, viewSize.width);
  const top = clamp(Math.min(detection.y1, detection.y2) * scaleY, 0, viewSize.height);
  const bottom = clamp(Math.max(detection.y1, detection.y2) * scaleY, 0, viewSize.height);

  return {
    left,
    top,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
};

function useLatestDetectionsLoop(enabled: boolean) {
  const latestDetectionsRef = useRef<Detection[]>([]);
  const detectionsVersionRef = useRef(0);

  useEffect(() => {
    latestDetectionsRef.current = [];
    detectionsVersionRef.current = 0;
    if (!enabled) return;

    const subscription = DeviceEventEmitter.addListener(
      'onYoloDetections',
      (data: { detections: Detection[] }) => {
        latestDetectionsRef.current = normalizeDetections(data?.detections);
        detectionsVersionRef.current += 1;
      },
    );

    return () => subscription.remove();
  }, [enabled]);

  return { latestDetectionsRef, detectionsVersionRef };
}

export function DetectionOverlay({ enabled = true }: DetectionOverlayProps) {
  const { latestDetectionsRef, detectionsVersionRef } = useLatestDetectionsLoop(enabled);
  const viewSizeRef = useRef<ViewSize>({ width: 0, height: 0 });
  const boxRefs = useRef<Array<View | null>>([]);
  const lastDrawnVersionRef = useRef(-1);

  const boxRefCallbacks = useMemo(
    () =>
      Array.from({ length: MAX_RENDER_BOXES }, (_, index) => (node: View | null) => {
        boxRefs.current[index] = node;
      }),
    [],
  );

  const hideAllBoxes = useCallback(() => {
    for (let index = 0; index < MAX_RENDER_BOXES; index += 1) {
      boxRefs.current[index]?.setNativeProps({
        style: {
          opacity: 0,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
      });
    }
  }, []);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    viewSizeRef.current = { width, height };
    lastDrawnVersionRef.current = -1;
  }, []);

  useEffect(() => {
    if (!enabled) {
      hideAllBoxes();
      lastDrawnVersionRef.current = -1;
      return;
    }

    let rafId = 0;
    let cancelled = false;
    lastDrawnVersionRef.current = -1;

    const draw = () => {
      if (cancelled) return;

      const currentVersion = detectionsVersionRef.current;
      const { width, height } = viewSizeRef.current;
      if (lastDrawnVersionRef.current === currentVersion && width > 0 && height > 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      if (width > 0 && height > 0) {
        const detections = latestDetectionsRef.current;
        const renderCount = Math.min(detections.length, MAX_RENDER_BOXES);

        for (let index = 0; index < MAX_RENDER_BOXES; index += 1) {
          const boxView = boxRefs.current[index];
          if (!boxView) continue;

          if (index < renderCount) {
            const mapped = mapDetectionToBox(detections[index], viewSizeRef.current);
            boxView.setNativeProps({
              style: {
                opacity: 1,
                left: mapped.left,
                top: mapped.top,
                width: mapped.width,
                height: mapped.height,
              },
            });
          } else {
            boxView.setNativeProps({
              style: {
                opacity: 0,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
              },
            });
          }
        }
        lastDrawnVersionRef.current = currentVersion;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      hideAllBoxes();
      lastDrawnVersionRef.current = -1;
    };
  }, [detectionsVersionRef, enabled, hideAllBoxes, latestDetectionsRef]);

  return (
    <View pointerEvents="none" style={styles.overlay} onLayout={handleLayout}>
      {boxRefCallbacks.map((setRef, index) => (
        <View key={`overlay-box-${index}`} ref={setRef} style={styles.box} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  box: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
    borderWidth: 3,
    borderColor: '#00FF00',
  },
});

export default DetectionOverlay;
