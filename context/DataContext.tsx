import { createContext } from "react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext<any>(null);

export const DataContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   // Data
   const API_URL = 'http://192.168.14.108:8000/trash/';
   const [trashes, setTrashes] = useState([]);
   const [data, setData] = useState([]);

   const organic = [data[1], 100 - data[1]];
   const organicColor = ['green', 'white'];
   const inOrganic = [data[2], 100 - data[2]];
   const inOrganicColor = ['orange', 'white'];

   const getTrashData = async () => {
      try {
         // Use axios to get data from API_URL
         const response = await axios.get(API_URL);
         // Store data in trashes state
         setTrashes(response.data);
      } catch (error) {
         console.error("fetching data err: ", error);
      }
   }
   // useEffect(() => {
   //    // Call getTrashData
   //    getTrashData();
   //    // Set time for getTrashData to execute again
   //    const timing = setInterval(() => {
   //       getTrashData();
   //       // console.log('get data complete');
   //    }, 10000);
   //    // Clear timing
   //    return () => clearInterval(timing);
   // }, []);

   useEffect(() => {
      // Update date depending on trashes's change
      if (trashes.length > 0) {
         setData(Object.values(trashes[0]));
      }
   }, [trashes]);
   return (
      <DataContext.Provider value={{ organic, organicColor, inOrganic, inOrganicColor }}>
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