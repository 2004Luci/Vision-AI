import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import {
  Camera,
  VisionCameraProxy,
  runAtTargetFps,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera'
import type { Frame } from 'react-native-vision-camera'
import type { CameraViewProps } from './types'

export function CameraView({
  style,
  isActive,
  detectionEnabled,
  facing,
  maxInferenceFps,
}: CameraViewProps) {
  const active = isActive ?? false
  const enabled = detectionEnabled ?? false
  const cameraFacing = facing ?? 'back'
  const inferenceFps = typeof maxInferenceFps === 'number' && Number.isFinite(maxInferenceFps)
    ? Math.max(1, Math.trunc(maxInferenceFps))
    : 8

  const device = useCameraDevice(cameraFacing)

  const plugin = useMemo(
    () =>
      VisionCameraProxy.initFrameProcessorPlugin('yoloFramePreprocess', {
        facing: cameraFacing,
      }),
    [cameraFacing],
  )

  const frameProcessor = useFrameProcessor(
    (frame: Frame) => {
      'worklet'
      // if (!enabled || plugin == null) return
      if (plugin == null) return
      runAtTargetFps(inferenceFps, () => {
        'worklet'
        plugin.call(frame)
      })
    },
    [enabled, inferenceFps, plugin],
  )

  if (!device) return null

  return (
    <Camera
      style={[StyleSheet.absoluteFill, style]}
      device={device}
      isActive={active}
      pixelFormat="yuv"
      frameProcessor={frameProcessor}
      video={false}
      audio={false}
    />
  )
}

export default CameraView
