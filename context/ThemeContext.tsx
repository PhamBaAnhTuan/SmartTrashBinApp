import React, { useContext } from "react";
import { createContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {

   const scheme = useColorScheme();
   const theme = {
      bgc: scheme === 'light' ? 'white' : '#12283d',
      text: scheme === 'light' ? 'black' : 'white',
      blue: scheme === 'light' ? '#12283d' : '#0e1e2d'
   }

   return (
      <ThemeContext.Provider value={{ theme }}>
         {children}
      </ThemeContext.Provider>
   )
};

export const useTheme = () => {
   const value = useContext(ThemeContext);
   if (!value) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }
   return value;
}