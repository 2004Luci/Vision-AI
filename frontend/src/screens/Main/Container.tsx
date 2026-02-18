import { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Splash } from '@/screens/Splash';
import { Navigation } from './Navigation';
import { AuthStack } from '@/screens/Auth/AuthStack';
import { useAuth } from '@/auth/AuthContext';
import { navigationRef } from '@/navigators';
import { colors } from '@/theme/colors';
import { logEvent } from '@/utils/logger';

const SPLASH_DURATION_MS = 6_300;

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#22C55E',
    background: '#080B10',
    card: '#0F1620',
    text: '#F1F5F9',
    border: '#1E2D3D',
    notification: '#22C55E',
  },
};

export function MainContainer() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const { user, loading, authAvailable } = useAuth();

  const onNavStateChange = useCallback(() => {
    const route = navigationRef.getCurrentRoute();
    if (route?.name) {
      logEvent('Navigation:ScreenFocus', { screen: route.name, params: route.params });
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsSplashVisible(false);
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  if (isSplashVisible) {
    return <Splash />;
  }

  if (loading) {
    return (
      <View className="flex-1 bg-screen items-center justify-center">
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} theme={darkTheme} onStateChange={onNavStateChange}>
      {user || !authAvailable ? <Navigation /> : <AuthStack />}
    </NavigationContainer>
  );
}
