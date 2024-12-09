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
  // import cac bien tu Context
  const { router, useAuthSelector } = useData();
  // import biến từ redux
  const { isAuthenticated } = useAuthSelector;
  // segments để check phiên đăng nhập của ng dùng đang ở đâu.
  const segments = useSegments();

  useEffect(() => {
    // nếu isAuthenticated === 'undefined' thì return, kh thực hiện gì.
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(tabs)';
    // nếu isAuthenticated === true và ng dùng đang k ở trong tab thì chuyển hướng sang tab. tức là đăng nhập thành công.
    if (isAuthenticated && !inApp) {
      // chuyển hướng đến tabs, vào đc app
      router.replace('(tabs)')
    } else {
      // nếu isAuthenticated === false thì chuyển hướng sang màn hình signin. tức là chưa đăng nhập.
      router.replace('signin');
    }
  }, [isAuthenticated]);
  // trả về Slot, Slot này giống như chừa chỗ cho màn hình đc trả về từ useEffect trên. là tabs hoặc signin.
  return <Slot />
};

export default function RootLayout() {
  // colorScheme để xác định chủ đề màu của điện thoại: sáng hoặc tối, light hoặc dark
  const colorScheme = useColorScheme();

  return (
    // toán tử 3 ngôi
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Provider cung cấp cấu hình store để lưu trữ data */}
      <Provider store={store}>
        {/* PersistGate để lưu data trong bộ nhớ, data vẫn đc lưu khi thoát app */}
        <PersistGate loading={null} persistor={persistor}>
          {/* DataContextProvider sẽ truyền cho MainLayout các biến */}
          <DataContextProvider>
            <MainLayout />
          </DataContextProvider>
        </PersistGate>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
