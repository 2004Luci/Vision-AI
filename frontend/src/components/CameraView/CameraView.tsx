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

type Props = {
  isActive: boolean
  detectionEnabled: boolean
  facing: 'front' | 'back'
  maxFps: number
}

export function CameraView({
  isActive,
  detectionEnabled,
  facing,
  maxFps,
}: Props) {
  const device = useCameraDevice(facing)

  const plugin = useMemo(
    () =>
      VisionCameraProxy.initFrameProcessorPlugin('yoloFramePreprocess', {
        facing,
      }),
    [facing],
  )

  const frameProcessor = useFrameProcessor(
    (frame: Frame) => {
      'worklet'
      if (!detectionEnabled || plugin == null) return
      runAtTargetFps(maxFps, () => {
        'worklet'
        plugin.call(frame)
      })
    },
    [detectionEnabled, maxFps, plugin],
  )

  if (!device) return null

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      pixelFormat="yuv"
      frameProcessor={frameProcessor}
      video={false}
      audio={false}
    />
  )
}