import { useEffect } from 'react';
// Router
import { Slot, useSegments } from 'expo-router';
// Context
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { ThemeContextProvider } from '../context/ThemeContext';
import { DataContextProvider } from '../context/DataContext';

const MainLayout = () => {
  // Gọi biến từ global AuthContext
  const { router, isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // if typeof isAuthenticated == 'undefined' thì trả về none
    if (typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0] === '(app)';
    // if đã xác thực và KHÔNG trong trong thư mục (app) thì router.replace('Home') chuyển đến Home
    if (isAuthenticated && !inApp) {
      router.replace('Home')
    } else {
      // else thì chuyển đến Đăng nhập
      router.replace('SignIn');
    }
    // set dependency isAuthenticated mỗi lần thay đổi thì thực hiện hàm useEffect
  }, [isAuthenticated])
  // Slot để trả về 1 chỗ trống (chỗ trống đó sẽ đc thay thế bằng màn hành đc trả về từ useEffect bên trên)
  return <Slot />
};

// RootLayout là layout chính để render ra
const RootLayout = () => {
  return (
    // Các context này bọc MainLayout, MainLayout có thể sdung các biến, hàm, function của các context này.
    <AuthContextProvider>
      <ThemeContextProvider>
        <DataContextProvider>
          <MainLayout />
        </DataContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
