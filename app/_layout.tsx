import { useEffect } from 'react';
// Router
import { Slot, useSegments } from 'expo-router';
// Context
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { ThemeContextProvider, useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const { router, isAuthenticated } = useAuth();
  const segments = useSegments();
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0] === '(app)';
    if (isAuthenticated && !inApp) {
      router.replace('Home')
    } else {
      router.replace('SignIn');
    }
  }, [isAuthenticated])
  return <Slot />
};

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <MainLayout />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
