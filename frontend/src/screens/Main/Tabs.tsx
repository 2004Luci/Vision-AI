import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { ScreenNames } from '@/configs/navigation';
import type { IHomeTabParamList } from '@/screens/screens.types';
import { HomeScreen } from '@/screens/Home';
import { ExploreScreen } from '@/screens/Explore';
import { VoiceScreen } from '@/screens/Voice';
import { AlertsScreen } from '@/screens/Alerts';
import { SettingsStack } from '@/screens/Settings/SettingsStack';

const Tab = createBottomTabNavigator<IHomeTabParamList>();

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#080B10',
          borderTopColor: '#1E2D3D',
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={focused ? '#22C55E' : '#334155'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                letterSpacing: 1.5,
                color: focused ? '#22C55E' : '#334155',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              HOME
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Explore}
        component={ExploreScreen}
        options={{
          title: 'EXPLORE',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              size={22}
              color={focused ? '#22C55E' : '#334155'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                letterSpacing: 1.5,
                color: focused ? '#22C55E' : '#334155',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              EXPLORE
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Voice}
        component={VoiceScreen}
        options={{
          title: 'VOICE',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'mic' : 'mic-outline'}
              size={22}
              color={focused ? '#6366F1' : '#334155'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                letterSpacing: 1.5,
                color: focused ? '#6366F1' : '#334155',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              VOICE
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Alerts}
        component={AlertsScreen}
        options={{
          title: 'ALERTS',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={22}
              color={focused ? '#F59E0B' : '#334155'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                letterSpacing: 1.5,
                color: focused ? '#F59E0B' : '#334155',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              ALERTS
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Settings}
        component={SettingsStack}
        options={{
          title: 'SETTINGS',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={22}
              color={focused ? '#14B8A6' : '#334155'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 9,
                fontWeight: '700',
                letterSpacing: 1.5,
                color: focused ? '#14B8A6' : '#334155',
                textTransform: 'uppercase',
                marginTop: -2,
              }}
            >
              SETTINGS
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
