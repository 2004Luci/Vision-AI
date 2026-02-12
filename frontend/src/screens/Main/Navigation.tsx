import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Tabs } from './Tabs';
import { colors } from '../../theme/colors';

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accentYellow,
    background: colors.screenBg,
    card: colors.cardBg,
    text: colors.white,
    border: colors.border,
    notification: colors.accentYellow,
  },
};

export function Navigation() {
  return (
    <NavigationContainer theme={darkTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
