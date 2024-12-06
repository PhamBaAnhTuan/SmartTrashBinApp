import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, Slot, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// contexts
import { DataContextProvider, useData } from '@/contexts/DataContext';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store/store';

const MainLayout = () => {
  // redux state
  const { router, useAuthSelector } = useData();
  const { isAuthenticated } = useAuthSelector;
  const segments = useSegments();

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0] === '(tabs)';
    if (isAuthenticated === true && !inApp) {
      router.replace('(tabs)')
    } else {
      router.replace('signin');
    }
  }, [isAuthenticated])
  return <Slot />
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DataContextProvider>
            <MainLayout />
          </DataContextProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
