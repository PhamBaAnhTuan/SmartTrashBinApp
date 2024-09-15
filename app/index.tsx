import { ActivityIndicator, View } from 'react-native';
import React from 'react';

const Start = () => {
   return (
      <View style={{flex: 1, justifyContent: 'center'}}>
         <ActivityIndicator size={50} color={'green'} />
      </View>
   )
}

export default Start;