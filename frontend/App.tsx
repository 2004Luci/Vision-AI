import './global.css';
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainContainer } from './src/screens/Main';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#0f1117' }}>
        <MainContainer />
      </View>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
