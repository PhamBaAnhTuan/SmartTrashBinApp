import React from 'react';
// Router
import { Stack, Tabs } from 'expo-router';
// Icons
import { Ionicons } from '@expo/vector-icons';
// Context
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  // theme đc import từ ThemeContext.
  const { theme } = useTheme();
  // interface để định nghĩa các props truyền vào các biến bên dưới
  interface TabBarProps {
    focused: boolean;
    color: string;
    size: number;
  }
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: theme.bgc,
        tabBarInactiveBackgroundColor: theme.bgc,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 15,
        },
        tabBarActiveTintColor: theme.text,
        tabBarStyle: {
          height: 65,
      }
      }}
    >
      <Tabs.Screen
        name='Home'
        options={{
          title: 'Home',
          tabBarIcon(props: TabBarProps) {
            return (
              <Ionicons
                name={'home'}
                size={props.focused ? 27 : 21}
                color={props.focused ? theme.text : 'gray'}
              />
            );
          }
        }}
      />
      <Tabs.Screen
        name='Search'
        options={{
          title: 'Search',
          tabBarIcon(props: TabBarProps) {
            return (
              <Ionicons
                name={'search'}
                size={props.focused ? 27 : 21}
                color={props.focused ? theme.text : 'gray'}
              />
            );
          }
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'Profile',
          tabBarIcon(props: TabBarProps) {
            return (
              <Ionicons
                name={'person-sharp'}
                size={props.focused ? 27 : 21}
                color={props.focused ? theme.text : 'gray'}
              />
            );
          }
        }}
      />
    </Tabs>
  )
}

export default Layout;