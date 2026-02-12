import './global.css';
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainContainer } from './src/screens/Main';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.screenBg }}>
        <MainContainer />
      </View>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
