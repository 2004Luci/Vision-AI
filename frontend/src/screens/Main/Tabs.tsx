import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Home';
import { ExploreScreen } from '../Explore';
import { ViewTabScreen } from '../ViewTab';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  View: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        contentStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
      <Tab.Screen
        name="View"
        component={ViewTabScreen}
        options={{ title: 'View' }}
      />
    </Tab.Navigator>
  );
}
