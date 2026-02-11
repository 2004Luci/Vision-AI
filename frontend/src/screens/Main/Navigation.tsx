import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Tabs } from './Tabs';

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFD54F',
    background: '#0f1117',
    card: '#1a1d24',
    text: '#ffffff',
    border: '#2d3142',
    notification: '#FFD54F',
  },
};

export function Navigation() {
  return (
    <NavigationContainer theme={darkTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
