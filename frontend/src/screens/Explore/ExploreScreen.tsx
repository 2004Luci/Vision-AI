import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CameraView from '../../components/CameraView';
import DetectionOverlay from '../../components/DetectionOverlay';
import { useExplorePermissions } from './hooks';

export function ExploreScreen() {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { permission, handlePermissionButtonPress } = useExplorePermissions();
  const [isLiveDetectionEnabled, setIsLiveDetectionEnabled] = useState(false);
  const [facing, setFacing] = useState<'back' | 'front'>('back');

  const canUseCamera = permission?.granted === true;
  const isModelActive = useMemo(
    () => Boolean(canUseCamera && isFocused && isLiveDetectionEnabled),
    [canUseCamera, isFocused, isLiveDetectionEnabled],
  );

  useEffect(() => {
    if (!canUseCamera && isLiveDetectionEnabled) {
      setIsLiveDetectionEnabled(false);
    }
  }, [canUseCamera, isLiveDetectionEnabled]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.statusRow}>
        <View style={[styles.statusLight, isModelActive ? styles.statusLightOn : styles.statusLightOff]} />
        <Text style={styles.statusText}>{isModelActive ? 'Model Active' : 'Model Inactive'}</Text>
      </View>

      <View style={styles.cameraCard}>
        {permission === null ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : !permission.granted ? (
          <View style={styles.centerContent}>
            <Text style={styles.permissionText}>Camera access is required.</Text>
            <Pressable style={styles.permissionButton} onPress={() => void handlePermissionButtonPress()}>
              <Text style={styles.permissionButtonText}>
                {permission.canAskAgain ? 'Enable Camera' : 'Open Settings'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
              style={StyleSheet.absoluteFill}
              isActive={isFocused}
              detectionEnabled={isModelActive}
              facing={facing}
            />
            <DetectionOverlay enabled={isModelActive} />
          </View>
        )}
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          style={[
            styles.actionButton,
            isModelActive ? styles.stopButton : styles.startButton,
            !canUseCamera && styles.actionButtonDisabled,
          ]}
          onPress={() => setIsLiveDetectionEnabled((current) => !current)}
          disabled={!canUseCamera}
        >
          <Text style={styles.actionButtonText}>
            {isModelActive ? 'Stop Live Detect' : 'Start Live Detect'}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.flipButton, !canUseCamera && styles.actionButtonDisabled]}
          onPress={() => setFacing((current) => (current === 'back' ? 'front' : 'back'))}
          disabled={!canUseCamera}
        >
          <Text style={styles.actionButtonText}>Flip Camera</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A0D12',
    paddingHorizontal: 16,
    gap: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#273145',
    backgroundColor: '#141B28',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  statusLight: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  statusLightOn: {
    backgroundColor: '#22C55E',
  },
  statusLightOff: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '700',
  },
  cameraCard: {
    width: '100%',
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#273145',
    backgroundColor: '#000000',
    overflow: 'hidden',
    maxHeight: 500,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  permissionButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#22C55E',
  },
  stopButton: {
    backgroundColor: '#F59E0B',
  },
  flipButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
});
