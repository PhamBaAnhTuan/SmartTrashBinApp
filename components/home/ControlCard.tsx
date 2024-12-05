import { StyleSheet, Switch, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react';
// theme
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Props {
   title: string,
   icon: any,
   devices: number
}
const ControlCard = (props: Props) => {
   // theme
   const colorScheme = useColorScheme();
   const color = Colors[colorScheme ?? 'light']

   const [isEnabled, setIsEnabled] = useState(false);

   // Function to toggle the switch
   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
   return (
      <View style={[styles.view, { backgroundColor: '#0e1e2d' }]}>
         {props.icon}
         <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.title}</Text>
         <Text style={{ color: 'white', fontSize: 12 }}>{props.devices} Devices</Text>

         <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#2496f2' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
         />
      </View>
   )
}

export default ControlCard

const styles = StyleSheet.create({
   view: {
      height: 160,
      width: '48%',
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      alignItems: 'baseline',
      justifyContent: 'space-around'
   },


})