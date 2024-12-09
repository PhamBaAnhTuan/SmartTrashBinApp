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
   // colorScheme để xác định chủ đề màu của điện thoại: sáng hoặc tối, light hoặc dark
   const colorScheme = useColorScheme();
   // color, [colorScheme ?? 'light']: sẽ trả về light hoặc dark, từ đó Colors sẽ trả về mảng màu tương ứng với chủ đề light hoặc dark.
   const color = Colors[colorScheme ?? 'light'];
   // khai báo biến eye để gán vào tên icon, icon là eye
   const [eye, setEye] = useState('eye');
   // khai báo biến hide để hiện hoặc ẩn password
   const [hide, setHide] = useState(true);
   // Handle visible passwords
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