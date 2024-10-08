import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
// Context
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
// Icons
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
// Pie charts
import PieChart from 'react-native-pie-chart';
// Components
import ControlCard from '@/component/Home/ControlCard'

const Home = () => {
   // Theme
   const { theme } = useTheme();
   // Data
   const { organic, organicColor, inOrganic, inOrganicColor } = useData();

   return (
      <SafeAreaView style={{ backgroundColor: theme.bgc, flex: 1 }}>
         <StatusBar backgroundColor={theme.bgc} />
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
               <View style={styles.headerLeft}>
                  <Image style={styles.userImg} source={require('../../assets/images/eLok.jpg')} resizeMode='cover' />

                  <View>
                     <Text style={[styles.welcomeText, { color: theme.text }]}>Welcome</Text>
                     <Text style={[styles.userText, { color: theme.text }]}>TuanPham</Text>
                  </View>
               </View>

               <View style={styles.headerRight}>
                  <TouchableOpacity><Fontisto name="bell" size={24} color={theme.text} /></TouchableOpacity>
                  <TouchableOpacity><Ionicons name="add-circle" size={28} color={theme.text} /></TouchableOpacity>
               </View>
            </View>

            <View style={[styles.energyContainer, { backgroundColor: theme.blue }]}>
               <View style={styles.energyWrap}>
                  <View style={styles.detailContainer}>
                     <FontAwesome6 name="circle-nodes" size={24} color="white" />
                     <Text style={{ color: 'white', marginLeft: 5 }}>Energy usage</Text>
                  </View>

                  <View style={styles.detailContainer}>
                     <FontAwesome6 name="calendar-plus" size={24} color="white" />
                     <Text style={{ color: 'white', marginLeft: 5 }}>12/9/2024</Text>
                  </View>
               </View>

               <View style={styles.infoContainer}>
                  <View style={styles.detailContainer}>
                     <View style={{ backgroundColor: '#00aeae', borderRadius: 100, padding: 7, marginRight: 10 }}>
                        <FontAwesome6 name="plug-circle-bolt" size={20} color="white" />
                     </View>

                     <View>
                        <Text style={{ color: 'white' }}>Today</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>28.6 kMh</Text>
                     </View>
                  </View>

                  <View style={{ height: '100%', width: 1, backgroundColor: 'white' }}></View>

                  <View style={styles.detailContainer}>
                     <View style={{ backgroundColor: '#ff6897', borderRadius: 100, padding: 7, marginRight: 10 }}>
                        <MaterialIcons name="electric-bolt" size={24} color="white" />
                     </View>

                     <View>
                        <Text style={{ color: 'white' }}>This month</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>678.6 kMh</Text>
                     </View>
                  </View>
               </View>
            </View>

            <View style={[styles.chartContainer, { backgroundColor: theme.blue }]}>
               <View style={styles.pieChartContainer}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Organic waste</Text>
                  {/* PieChart này để hiển thị data trashes */}
                  <PieChart
                     style={{ marginVertical: 10 }}
                     widthAndHeight={100}
                     //  series={organic} là data organic trash đc import từ DataContext đc hiển thị trên biểu đồ
                     series={organic}
                     // sliceColor={organicColor}: hiển thị màu cho biểu đồ
                     sliceColor={organicColor}
                  />
                  {/* Hiển thị % organic[0] bvi biến organic là mảng chứa 2 biến: organic trash và thang 100% - biến organic*/}
                  <Text style={{ color: 'white' }}>{organic[0]}%</Text>

               </View>
               <View style={styles.pieChartContainer}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Inorganic waste</Text>
                  <PieChart
                     style={{ marginVertical: 10 }}
                     widthAndHeight={100}
                     series={inOrganic}
                     sliceColor={inOrganicColor}
                  />
                  <Text style={{ color: 'white' }}>{inOrganic[0]}%</Text>
               </View>
            </View>

            <View style={styles.otherDeviceContainer}>
               <ControlCard
                  title='Living Room'
                  devices={5}
                  icon={<AntDesign name='home' size={24} color='white' />}
               />
               <ControlCard
                  title='Kitchen Room'
                  devices={4}
                  icon={<MaterialIcons name="kitchen" size={24} color="white" />}
               />
               <ControlCard
                  title='Bedroom'
                  devices={4}
                  icon={<Ionicons name="bed" size={24} color="white" />}
               />
               <ControlCard
                  title='Bathroom'
                  devices={3}
                  icon={<FontAwesome5 name="bath" size={24} color="white" />}
               />
            </View>
         </ScrollView>

      </SafeAreaView>
   )
}

export default Home

const styles = StyleSheet.create({
   headerContainer: {
      height: 80,
      width: '97%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5
   },


   headerLeft: {
      height: '100%',
      width: '70%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },
   userImg: {
      height: 50,
      width: 50,
      borderRadius: 50,
      marginRight: 10
   },
   welcomeText: {
      fontSize: 12,
      // fontWeight: 'bold'
   },
   userText: {
      fontSize: 15,
      fontWeight: 'bold'
   },

   headerRight: {
      height: '100%',
      width: '20%',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },


   energyContainer: {
      height: 150,
      width: '97%',
      alignSelf: 'center',
      borderRadius: 10,
      marginBottom: 7
   },

   energyWrap: {
      height: '50%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   dayWrap: {
      // height: 'auto',
      width: 'auto',
      // borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },

   infoContainer: {
      height: '45%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },

   detailContainer: {
      height: '100%',
      width: '45%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },


   chartContainer: {
      height: 'auto',
      width: '97%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      borderRadius: 10,
      paddingVertical: 15,
      marginBottom: 7
   },
   pieChartContainer: {
      alignItems: 'center',
   },


   otherDeviceContainer: {
      height: 'auto',
      width: '97%',
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
   }
})