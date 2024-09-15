import React from 'react';
// Router
import { Stack, Tabs } from 'expo-router';
// Icons
import { Ionicons } from '@expo/vector-icons';
// Context
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const {theme} = useTheme();
  interface TabBarProps {
    focused: boolean;
    color: string;
    size: number;
    // name: string;
  }
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: theme.bgc,
        tabBarInactiveBackgroundColor: theme.bgc,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle:{
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 15,
        },
        tabBarActiveTintColor: theme.text,
        tabBarStyle:{
          height: 65,
          borderColor: theme.bgc
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