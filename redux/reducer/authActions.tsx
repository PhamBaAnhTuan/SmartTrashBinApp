import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";

const API_URL = 'http://192.168.93.143:8000';

export const signInAction = (username: string, password: string, resetAuth: () => void) => {
   return async (dispatch: Dispatch) => {
      if (!username && !password) {
         ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
         return;
      } if (!username) {
         ToastAndroid.show('Enter User Name!', ToastAndroid.SHORT);
         return;
      } if (!password) {
         ToastAndroid.show('Enter Password!', ToastAndroid.SHORT);
         return;
      }
      try {
         const response = await axios.post(`${API_URL}/user/signin/`,
            {
               username,
               password
            }
         );
         ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
         console.log('User sign in successful: ', response.data.username);
         dispatch({
            type: 'SIGN_IN',
            payload: response.data
         })
         resetAuth();
      } catch (error: any) {
         ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
         console.log('SIGN IN ERROR: ', error.response.data.error);
         resetAuth();
      }
   };
}

export const signUpAction = (username: string, password: string, resetAuth: () => void) => {
   return async (dispatch: Dispatch) => {
      if (!username || !password) {
         ToastAndroid.show('Enter Full name and Password!', ToastAndroid.SHORT);
         return;
      } if (!username || username.length < 6) {
         ToastAndroid.show('Username at least 6 characters!', ToastAndroid.SHORT);
         return;
      } if (!password || password.length < 6) {
         ToastAndroid.show('Password at least 6 characters!', ToastAndroid.SHORT);
         return;
      }
      try {
         const response = await axios.post(`${API_URL}/user/signup/`,
            {
               username,
               password
            }
         );
         // ToastAndroid.show('Signed up successful!', ToastAndroid.SHORT);
         ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
         console.log('User sign up successful: ', response.data.message);
         dispatch({
            type: 'SIGN_UP',
            payload: true
         })
         resetAuth();
      } catch (error: any) {
         let msg = error.response;
         if (msg = { "username": "A user with that username already exists." }) { msg = 'Username already exist!' }
         ToastAndroid.show(msg, ToastAndroid.SHORT);
         console.error('SIGN UP ERROR: ', msg);
         // resetAuth();
      }
   }
}

export const signOutAction = () => {
   ToastAndroid.show('Signed out!', ToastAndroid.SHORT);
   return {
      type: 'SIGN_OUT',
      payload: false
   }
}  

export const getTrashData = () => {
   return async (dispatch: Dispatch) => {
      try {
         const response = await axios.get(`${API_URL}/api/trash/`);
         dispatch({
            type: 'GET_TRASH_DATA',
            payload: response.data
         })
         console.log('Get trash data successful: ', response.data);
      } catch (error: any) {
         console.log('GET TRASH DATA ERROR: ', error);
      }
   }
}