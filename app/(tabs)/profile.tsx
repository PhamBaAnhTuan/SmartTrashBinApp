import {
  Alert,
  Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View

} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons
import { AntDesign, Entypo, Feather, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
// Components
import SettingCard from '@/components/profile/SettingCard';
// Theme
import { Colors } from '@/constants/Colors';
// Context
import { useData } from '@/contexts/DataContext';
// Actions
import { getTrashData, signOutAction } from '@/redux/reducer/authActions';

const Profile = () => {
  // Theme
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  // Redux
  const { router, dispatch, useAuthSelector } = useData();
  const { isAuthenticated, user } = useAuthSelector;
  // Handle sign out
  const signOut = () => {
    Alert.alert('Sign out?', 'Do you wanna sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(signOutAction());
          }
        }
      ]
    )
  };
  // get dữ liệu rác từ server
  const getData = () => {
    dispatch(getTrashData());
  }
  const log = () => {
    console.log('isAuthenticated: ', isAuthenticated);
  }

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={[styles.welcomeText, { color: color.text }]}>Profile</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity onPress={log}>
              <Fontisto name="bell" size={24} color={color.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={28} color={color.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.inforContainer, { backgroundColor: color.card }]}>

          <TouchableOpacity style={[styles.profileContainer]}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={require('../../assets/images/e-lok.jpg')} />
            </View>
            <View style={styles.profileInfoContainer}>
              <Text style={[styles.userNameText, { color: color.onText }]}>{user?.username || 'GenG Team'}</Text>
              <Text style={{ color: color.onText, opacity: 0.8 }}>http://donga.edu.vn</Text>
            </View>
            <View style={styles.nextIconContainer}>
              <Entypo name="chevron-right" size={24} color={color.onText} />
            </View>
          </TouchableOpacity>

          <View style={styles.devicesContainer}>
            <TouchableOpacity style={styles.devicesWrap}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'lightblue' }}>23</Text>
              <Text style={{ fontSize: 13, color: color.onText }}>Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.devicesWrap}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'lightblue' }}>12</Text>
              <Text style={{ fontSize: 13, color: color.onText }}>Smart trash bin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.devicesWrap}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'lightblue' }}>27</Text>
              <Text style={{ fontSize: 13, color: color.onText }}>Wifi network</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.devicesContainer}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={{ fontSize: 11, fontWeight: '500', color: 'lightblue' }}>Edit Profile</Text>
              <FontAwesome5 name="user-edit" size={17} color="lightblue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={{ fontSize: 11, fontWeight: '500', color: 'lightblue' }}>Settings</Text>
              <Ionicons name="settings" size={17} color="lightblue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={{ fontSize: 11, fontWeight: '500', color: 'lightblue' }}>Share</Text>
              <AntDesign name="sharealt" size={17} color="lightblue" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.settingContainer, { backgroundColor: color.card }]}>
          <SettingCard
            onPress={getData}
            icon={<Feather name="folder-minus" size={24} color={color.onText} />}
            title='Get data'
          />
          <SettingCard
            onPress={null}
            icon={<Feather name="bookmark" size={24} color={color.onText} />}
            title='Device list'
          />
          <SettingCard
            onPress={null}
            icon={<Ionicons name="location-outline" size={24} color={color.onText} />}
            title='Smart trash bin location'
          />
          <SettingCard
            onPress={null}
            icon={<Feather name="pie-chart" size={24} color={color.onText} />}
            title='Trash amounts'
          />
          <SettingCard
            onPress={null}
            icon={<Ionicons name="information-circle-outline" size={24} color={color.onText} />}
            title='About us'
          />
          <SettingCard
            onPress={signOut}
            icon={<Ionicons name="exit" size={24} color={color.error} />}
            title='Sign out'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  // Header container
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
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 25,
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


  // Infor container
  inforContainer: {
    height: 'auto',
    width: '97%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
  // profile container
  profileContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },

  profileImageContainer: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1
  },
  profileImage: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    borderRadius: 100
  },

  profileInfoContainer: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    paddingLeft: 15
  },
  userNameText: {
    fontSize: 17,
    fontWeight: 'bold'
  },

  nextIconContainer: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },

  // Devices container
  devicesContainer: {
    height: 'auto',
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5
  },

  devicesWrap: {
    height: '100%',
    width: '33.3%',
    // backgroundColor: 'gray',
    alignItems: 'center',
  },

  // Edit btn
  editBtn: {
    height: 27,
    width: '27%',
    backgroundColor: '#357181',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },


  // Setting container
  settingContainer: {
    height: 'auto',
    width: '97%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#c2c2c2',
    marginVertical: 7
  },
})