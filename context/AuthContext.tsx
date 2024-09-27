import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useState, useEffect } from 'react';
// Router
import { useRouter, useNavigation } from "expo-router";

export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   // Router để điều hướng sang các trang khác
   const router = useRouter();
   // như trên
   const navigation = useNavigation();

   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(undefined);

   useEffect(() => {
      // const unsub = onAuthStateChanged(auth, (user) => {
      //    if (user) {
      //       setIsAuthenticated(true);
      //       setUser(user);
      //    } else {
      //       setIsAuthenticated(false);
      //       setUser(null);
      //    }
      // })
   setIsAuthenticated(false);
   }, [isAuthenticated]);
   return (
   <AuthContext.Provider value={{ router, navigation, user, isAuthenticated}}>
      {children}
   </AuthContext.Provider>
  )
}

export const useAuth = () => {
   const value = useContext(AuthContext);
   if (!value) {
      throw new Error('useAuth must be used within an AuthContext');
   }
   return value;
}