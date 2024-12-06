import { StyleSheet, Text, View, TextInput, useColorScheme } from 'react-native';
import React from 'react';
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
const InputText = (props: Props) => {
   // Theme
   const colorScheme = useColorScheme();
   const color = Colors[colorScheme ?? 'light'];
   return (
      <View style={{marginBottom: 20}}>
         <Text style={[styles.title, { color: color.text }]}>{props.title}</Text>
         <TextInput style={[styles.textInput, { color: color.background, backgroundColor: color.tint }]}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            secureTextEntry={props.hideText}
            value={props.value}
         />
      </View>
   )
}

export default InputText

const styles = StyleSheet.create({
   title: {
      fontWeight: 'bold',
      alignItems: 'center',
      paddingLeft: 20,
      paddingBottom: 5,
      // borderWidth: 1,
   },
   textInput: {
      height: 45,
      width: '95%',
      // borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      alignSelf: 'center',
   },
})