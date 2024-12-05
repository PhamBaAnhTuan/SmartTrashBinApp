import {
   View, Text, StyleSheet, Dimensions, TextInput,
   Platform, StatusBar, TouchableOpacity, Image, Alert, ToastAndroid,
   useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useRef, useState } from 'react';
// Icon
import { Fontisto, Feather, Ionicons } from '@expo/vector-icons';
// Context
import { useData } from '@/contexts/DataContext';
// Theme
import { Colors } from '@/constants/Colors';
// Components
// import { Loading } from '../components/Animation/Animation';
import InputText from '@/components/input/InputText';
import InputPassword from '@/components/input/InputPassword';
// Actions
import { getTrashData, signInAction } from '@/redux/reducer/authActions';


const Signin = () => {
   // Redux
   const { router, dispatch, useAuthSelector, userName, password, setUserName, setPassword, resetAuth } = useData();
   const { isAuthenticated, user, trash } = useAuthSelector;
   // Theme
   const colorScheme = useColorScheme();
   const color = Colors[colorScheme ?? 'light'];
   // Handle visible passwords
   const [eye, setEye] = useState('eye')
   const [hide, setHide] = useState(true);
   const hidePass = () => {
      eye == 'eye' ? setEye('eye-off') : setEye('eye');
      hide === true ? setHide(false) : setHide(true);
   };
   const [remember, setRemember] = useState('checkbox-passive')
   const handleRemember = () => {
      remember == 'checkbox-passive' ? setRemember('checkbox-active') : setRemember('checkbox-passive');
   };
   // Sign in method
   const [loading, setLoading] = useState(false);
   // Handle sign in
   const signIn = () => dispatch(signInAction(userName, password, resetAuth));
   // useEffect(() => {
   //    if(isAuthenticated === true){
   //       dispatch(getTrashData());
   //    }
   // }, [isAuthenticated]);
   
   const log = () => {
      console.log(
         'isAuthenticated: ', isAuthenticated,
         '\nuser: ', user,
         '\nTrash: ', trash
      )
    }

   return (
      <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>

         <View style={styles.titleContainer}>
            <Text style={[styles.welcomeText, { color: color.text }]}>Hi, Welcome back!</Text>
         </View>

         <View style={styles.formContainer}>
            <InputText
               title='Username'
               keyboardType={'default'}
               hideText={false}
               value={userName}
               onChangeText={x => setUserName(x)}
            />
            <InputPassword
               title='Password'
               keyboardType={'default'}
               hideText={true}
               value={password}
               onChangeText={x => setPassword(x)}
            />
         </View>

         <View style={styles.rememberContainer}>
            <TouchableOpacity style={styles.rmbWrapLeft} onPress={handleRemember}>
               <Fontisto name={remember} size={20} color={color.text} />
               <Text style={{ fontSize: 12, color: color.text }}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={log} >
               <Text style={{ color: 'tomato', fontSize: 12 }}>Forgot password?</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.btnContainer}>
            {/* {loading
               ? (
                  <Loading size={200} />
               )
               : ( */}
            <TouchableOpacity
               style={[styles.signInBtn, { backgroundColor: color.blue }]}
               onPress={signIn}>
               <Text style={{ color: color.text, fontSize: 17, fontWeight: 'bold' }}>Sign in</Text>
            </TouchableOpacity>
            {/* )
            } */}
         </View>

         <View style={styles.orContainer}>
            <View style={{ height: 0.5, width: 130, backgroundColor: color.text }}></View>
            <Text style={{ color: color.text }}>Or</Text>
            <View style={{ height: 0.5, width: 130, backgroundColor: color.text }}></View>
         </View>

         <View style={styles.otherMethod}>
            <TouchableOpacity style={[styles.fbBtn, { borderColor: color.text }]}>
               <Ionicons name="logo-facebook" size={27} color="blue" />

               <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 10, color: color.text }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.fbBtn, { borderColor: color.text }]}>
               {/* <Ionicons name="logo-google" size={24} color="black" /> */}
               <Image source={require('../assets/images/icon.png')} style={{ height: 24, width: 23 }} />
               <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 10, color: color.text }}>Google</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.signUpText}>
            <Text style={{ fontWeight: 'bold', color: color.text }}>Not a member? </Text>
            <TouchableOpacity>
               <Text style={{ color: color.blue, fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
         </View>

      </SafeAreaView>
   )
}

export default Signin;

const styles = StyleSheet.create({
   titleContainer: {
      height: '20%',
      width: '100%',
      justifyContent: 'center',
      // borderWidth: 1,
   },
   welcomeText: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 20,
      // borderWidth: 1,
   },


   formContainer: {
      height: '30%',
      width: '100%',
      // alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
   },


   rememberContainer: {
      height: '10%',
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      // borderWidth: 1
   },
   rmbWrapLeft: {
      width: '31%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // borderWidth: 1
   },


   btnContainer: {
      height: '15%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
   signInBtn: {
      height: 50,
      width: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      // borderWidth: 1
   },

   orContainer: {
      height: '5%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      // borderWidth: 1
   },

   otherMethod: {
      height: '10%',
      width: '95%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-around',
      // borderWidth: 1
   },
   fbBtn: {
      flexDirection: 'row',
      height: 40,
      width: 140,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 0.5
   },


   signUpText: {
      height: '10%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   }
});