import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react';
// theme
import { Colors } from '@/constants/Colors';
// Icons
import { Entypo } from '@expo/vector-icons';

interface Props {
   icon: any,
   title: string,
   onPress: any
}
const SettingCard = (props: Props) => {
   // theme
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light']
   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={styles.iconContainer}>
            {props.icon}
         </View>
         <View style={styles.contentContainer}>
            <Text style={{ color: color.onText, fontWeight: 'bold' }}>{props.title}</Text>
         </View>
         <View style={styles.wrap}>
            <Entypo name="chevron-right" size={24} color={color.onText} />
         </View>
      </TouchableOpacity>
   )
}

export default SettingCard

const styles = StyleSheet.create({
   container: {
      height: 60,
      width: '100%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between'
   },

   iconContainer: {
      height: '100%',
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   icon: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
   },


   contentContainer: {
      height: '100%',
      width: '65%',
      // borderWidth: 1,
      justifyContent: 'center',
      marginLeft: 10,
   },


   wrap: {
      height: '100%',
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1
   },
   rightIcon: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
   }
})