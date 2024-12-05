import { createContext } from "react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// Router
import { useRouter } from "expo-router";
// Redux
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";

export const DataContext = createContext<any>(null);
export const DataContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   // Dispatch for redux
   const dispatch: AppDispatch = useDispatch<AppDispatch>();
   // useSelector for redux
   const useAuthSelector = useSelector((state: RootState) => state.auth);
   // Router
   const router = useRouter();
   // Form
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   // Reset form
   const resetAuth = () => {
      setUserName('');
      setPassword('');
   };
   // Form
   const [data, setData] = useState({});
   const resetForm = () => setData({});

   return (
      <DataContext.Provider value={{
         dispatch, router, useAuthSelector,
         userName, setUserName, password, setPassword, resetAuth,
         data, setData, resetForm
      }}>
         {children}
      </DataContext.Provider>
   )
};

export const useData = () => {
   const value = useContext(DataContext);
   if (!value) {
      throw new Error('useData must be used within a DataProvider');
   }
   return value;
}