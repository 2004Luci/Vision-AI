import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type LayoutChangeEvent,
  NativeModules,
  StyleSheet,
  type DimensionValue,
  View,
} from 'react-native';

type NativeDetection = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type YoloInferenceModule = {
  getLatestDetections?: () => unknown;
};

type ViewSize = {
  width: number;
  height: number;
};

type MappedBox = {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const MODEL_SIZE = 640;
const POLL_INTERVAL_MS = 200;

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return value;
};

const normalizeDetections = (payload: unknown): NativeDetection[] => {
  if (!Array.isArray(payload)) return [];

  const normalized: NativeDetection[] = [];
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

const mapDetectionToBox = (detection: NativeDetection, viewSize: ViewSize, index: number): MappedBox => {
  const scaleX = viewSize.width / MODEL_SIZE;
  const scaleY = viewSize.height / MODEL_SIZE;

  const left = clamp(Math.min(detection.x1, detection.x2) * scaleX, 0, viewSize.width);
  const right = clamp(Math.max(detection.x1, detection.x2) * scaleX, 0, viewSize.width);
  const top = clamp(Math.min(detection.y1, detection.y2) * scaleY, 0, viewSize.height);
  const bottom = clamp(Math.max(detection.y1, detection.y2) * scaleY, 0, viewSize.height);

  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);

  return {
    key: `${index}-${Math.round(left)}-${Math.round(top)}-${Math.round(width)}-${Math.round(height)}`,
    left,
    top,
    width,
    height,
  };
};

const detectionsAreEqual = (a: NativeDetection[], b: NativeDetection[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].x1 !== b[i].x1 || a[i].y1 !== b[i].y1 || a[i].x2 !== b[i].x2 || a[i].y2 !== b[i].y2) {
      return false;
    }
  }
  return true;
};

type DetectionOverlayProps = {
  enabled?: boolean;
};

export function DetectionOverlay({ enabled = true }: DetectionOverlayProps) {
  const [viewSize, setViewSize] = useState<ViewSize>({ width: 0, height: 0 });
  const [detections, setDetections] = useState<NativeDetection[]>([]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize((current) => {
      if (current.width === width && current.height === height) {
        return current;
      }
      return { width, height };
    });
  }, []);

  useEffect(() => {
    if (!enabled) {
      setDetections([]);
      return;
    }

    const module = NativeModules?.YoloInferenceModule as YoloInferenceModule | undefined;
    if (typeof module?.getLatestDetections !== 'function') return;

    const pullLatest = () => {
      try {
        const payload = module.getLatestDetections?.();
        const nextDetections = normalizeDetections(payload);
        setDetections((current) => (detectionsAreEqual(current, nextDetections) ? current : nextDetections));
      } catch {
        setDetections([]);
      }
    };

    pullLatest();
    const intervalId = setInterval(pullLatest, POLL_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled]);

  const boxes = useMemo(() => {
    if (viewSize.width <= 0 || viewSize.height <= 0) return [];
    return detections.map((detection, index) => mapDetectionToBox(detection, viewSize, index));
  }, [detections, viewSize]);

  return (
    <View pointerEvents="none" style={styles.overlay} onLayout={handleLayout}>
      {boxes.map((box) => (
        <View
          key={box.key}
          style={[
            styles.box,
            {
              left: box.left as DimensionValue,
              top: box.top as DimensionValue,
              width: box.width as DimensionValue,
              height: box.height as DimensionValue,
            },
          ]}
        />
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
    borderWidth: 3,
    borderColor: '#00FF00',
  },
});

export default DetectionOverlay;
