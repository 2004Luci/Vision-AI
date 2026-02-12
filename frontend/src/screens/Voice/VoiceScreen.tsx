import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const { accentYellow, screenBg, white, cardBg, darkBg } = colors;

const BAR_COUNT = 8;
const BAR_MIN = 0.15;
const BAR_MAX = 1;

function SoundWaveBars({ isActive }: { isActive: boolean }) {
  const bars = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(BAR_MIN)),
  ).current;

  useEffect(() => {
    if (!isActive) {
      bars.forEach((b) => b.setValue(BAR_MIN));
      return;
    }

    const STAGGER = 60;
    const DURATION = 120;

    // Wave goes left → right (bars rise in sequence)
    const waveForward = Animated.parallel(
      bars.map((bar, i) =>
        Animated.sequence([
          Animated.delay(i * STAGGER),
          Animated.timing(bar, {
            toValue: BAR_MAX,
            useNativeDriver: true,
            duration: DURATION,
          }),
        ]),
      ),
    );

    // Wave comes back right → left (bars fall in sequence)
    const waveBack = Animated.parallel(
      bars.map((bar, i) =>
        Animated.sequence([
          Animated.delay((BAR_COUNT - 1 - i) * STAGGER),
          Animated.timing(bar, {
            toValue: BAR_MIN,
            useNativeDriver: true,
            duration: DURATION,
          }),
        ]),
      ),
    );

    const loop = Animated.loop(
      Animated.sequence([waveForward, waveBack]),
      { iterations: -1 },
    );
    loop.start();
    return () => loop.stop();
  }, [isActive]);

  return (
    <View style={styles.soundWave}>
      {bars.map((bar, i) => {
        const scaleY = bar.interpolate({
          inputRange: [0, 1],
          outputRange: [0.12, 1],
        });
        const translateY = bar.interpolate({
          inputRange: [0, 1],
          outputRange: [11, 0],
        });
        return (
          <View key={`bar-${i}`} style={styles.waveBarContainer}>
            <Animated.View
              style={[styles.waveBar, { transform: [{ scaleY }, { translateY }] }]}
            />
          </View>
        );
      })}
    </View>
  );
}

export function VoiceScreen() {
  const insets = useSafeAreaInsets();
  const [isListening, setIsListening] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Voice Mode</Text>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.micButton}
          activeOpacity={0.9}
          onPress={() => setIsListening((p) => !p)}
        >
          <View style={styles.micButtonInner}>
            <Ionicons name="mic" size={64} color={accentYellow} />
          </View>
        </TouchableOpacity>

        <SoundWaveBars isActive={isListening} />

        <Text style={styles.statusText}>
          {isListening ? 'LISTENING...' : 'TAP TO START'}
        </Text>

        <TouchableOpacity
          style={[
            styles.stopButton,
            !isListening && styles.stopButtonInactive,
          ]}
          activeOpacity={0.8}
          onPress={() => setIsListening((p) => !p)}
        >
          <Ionicons
            name={isListening ? 'stop-circle' : 'mic'}
            size={24}
            color={isListening ? '#000000' : white}
          />
          <Text
            style={[
              styles.stopButtonText,
              !isListening && styles.stopButtonTextInactive,
            ]}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: screenBg,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: white,
    marginTop: 24,
    marginBottom: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  micButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: darkBg,
    borderWidth: 3,
    borderColor: accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  micButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundWave: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
    height: 28,
  },
  waveBarContainer: {
    width: 4,
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  waveBar: {
    width: 4,
    height: 24,
    backgroundColor: accentYellow,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: white,
    letterSpacing: 2,
    marginBottom: 32,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: accentYellow,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    gap: 12,
    minWidth: 260,
  },
  stopButtonInactive: {
    backgroundColor: cardBg,
    borderWidth: 2,
    borderColor: accentYellow,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  stopButtonTextInactive: {
    color: accentYellow,
  },
});
