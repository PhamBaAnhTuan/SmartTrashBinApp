import { createContext } from "react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// Data context để lưu trữ biến, State toàn cục(global).
export const DataContext = createContext<any>(null);

export const DataContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
   // Đường dẫn url đến server
   const API_URL = 'http://192.168.8.108:8000/api/trash/';
   // State để lưu dữ liệu rác từ API
   const [trashes, setTrashes] = useState([]);
   // State để lưu trữ biến trash để 
   const [data, setData] = useState([]);

   // data[1] lưu organic (hữu cơ) trash
   // data[2] luu inOrganic (vô cơ) trash
   const organic = [data[1], 100 - data[1]];
   // set màu cho biểu đồ PieChart của organic trash
   const organicColor = ['green', 'white'];
   const inOrganic = [data[2], 100 - data[2]];
   // set màu cho biểu đồ PieChart của inOrganic trash
   const inOrganicColor = ['orange', 'white'];

   const getTrashData = async () => {
      try {
         // Use axios to get data from API_URL
         const response = await axios.get(API_URL);
         // lưu dữ liệu trả về từ API vào trong trashes
         setTrashes(response.data);
      } catch (error) {
         console.error("fetching data err: ", error);
      }
   }
   useEffect(() => {
      // Call getTrashData
      getTrashData();
      // Set tgian cho hàm getTrashData(); thục hiện lại sau 10s
      const timing = setInterval(() => {
         getTrashData();
      }, 10000);
      // Clear timing
      return () => clearInterval(timing);
   }, []);

   useEffect(() => {
      // Update data dựa vào sự thay đổi của biến trashes.
      if (trashes.length > 0) {  // if độ dài của object trashes > 0 thì thục hiện lệnh setData bên dưới
         // setData để lưu trữ object trashes thành mảng lưu trong data.
         setData(Object.values(trashes[0]));
         // trashes[0] bvi biến trashes chỉ lưu 1 object, nên index của object đầu tiên trong mảng là 0.
      }
   }, [trashes]); //set dependence là trash mỗi khi biến trash thay đổi thì hàm useEffect đc thực hiện
   return (
      <DataContext.Provider value={{ organic, organicColor, inOrganic, inOrganicColor }}>
         {/* Truyền children vào DataContextProvider, children sẽ sdung đc các biến trong DataContext: organic, organicColor, inOrganic, inOrganicColor */}
         {children}
      </DataContext.Provider>
   )
};

export const useData = () => {
   // sdung useContext để sdung DataContext
   const value = useContext(DataContext);
   if (!value) {
      throw new Error('useData must be used within a DataProvider');
   }
   return value;
}