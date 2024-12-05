import { StyleSheet, Text, View, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState } from 'react';
// Icon
import { Fontisto, Feather, Ionicons } from '@expo/vector-icons';
// Context
import { useData } from '@/contexts/DataContext';
// Theme
import { Colors } from '@/constants/Colors';

interface Props {
   title: string,
   keyboardType: any,
   hideText: boolean,
   value: string,
   onChangeText: any
}
const InputPassword = (props: Props) => {
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
   return (
      <>
         <Text style={[styles.title, { color: color.text }]}>{props.title}</Text>
         <View style={[styles.inputContainer, { backgroundColor: color.tint }]}>
            <TextInput style={[styles.textInput, { color: color.background, backgroundColor: color.tint }]}
               keyboardType={props.keyboardType}
               onChangeText={props.onChangeText}
               secureTextEntry={hide}
               value={props.value}
            />
            <TouchableOpacity style={styles.icon} onPress={hidePass}>
               <Feather name={eye} size={24} color={color.background} />
            </TouchableOpacity>
         </View>
      </>
   )
}

export default InputPassword

const styles = StyleSheet.create({
   title: {
      fontWeight: 'bold',
      alignItems: 'center',
      paddingLeft: 20,
      paddingBottom: 5,
      // borderWidth: 1,
   },


   inputContainer: {
      flexDirection: 'row',
      height: 45,
      width: '95%',
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      // borderWidth: 1
   },
   textInput: {
      height: '100%',
      width: '85%',
      // borderWidth: 1,
      paddingLeft: 10,
      borderRadius: 10,
      alignSelf: 'center',
   },

   icon: {
      height: '100%',
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   }
})