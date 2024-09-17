import { Dimensions, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  // Theme
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.safeView, { backgroundColor: theme.bgc }]}>
      <View style={styles.signInContainer}>
        <Text style={[styles.signInText, {color: theme.text}]}>SignIn</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={{ height: 'auto', width: '90%', alignSelf: 'center' }}>
          <Text style={[styles.emailText, {color: theme.text}]}>Email</Text>
          <TextInput style={[styles.emailInput, {borderColor: theme.text}]} keyboardType='email-address' />
        </View>

        <View style={{ height: 'auto', width: '90%', alignSelf: 'center', marginTop: 10 }}>
          <Text style={[styles.emailText, {color: theme.text}]}>Password</Text>
          <TextInput style={[styles.emailInput, {borderColor: theme.text}]} secureTextEntry={true} />
        </View>
      </View>

      <TouchableOpacity style={styles.signInBtn} onPress={() => router.push('Home')}>
        <Text style={{ fontWeight: 'bold', color: theme.bgc}}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.otherSignIn}>
        <Text style={{color: theme.text}}>Sign in as Customer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
    alignItems: 'center',
  },


  signInContainer: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },


  inputContainer: {
    height: 200,
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'center'
  },

  emailText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  emailInput: {
    height: 45,
    width: '100%',
    paddingLeft: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5
  },


  signInBtn: {
    height: 50,
    width: '90%',
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#008a00',
    alignItems: 'center',
    justifyContent: 'center',
  },


  otherSignIn:{
    marginTop: 200
  }
})