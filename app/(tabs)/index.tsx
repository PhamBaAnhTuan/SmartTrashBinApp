import {
  Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, useColorScheme

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ControlCard from '@/components/home/ControlCard';
// icons
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
// charts
import PieChart from 'react-native-pie-chart';
import { StatusBar } from 'expo-status-bar';
// theme
import { Colors } from '@/constants/Colors';
// context
import { useData } from '@/contexts/DataContext';

const HomeScreen = () => {
  // import cac bien tu Context
  const { router, dispatch, useAuthSelector, userName, password, setUserName, setPassword, resetAuth } = useData();
  // import cac bien tu Redux
  const { isAuthenticated, user, trash } = useAuthSelector;
  // colorScheme để xác định chủ đề màu của điện thoại: sáng hoặc tối, light hoặc dark
  const colorScheme = useColorScheme();
  // color, [colorScheme ?? 'light']: sẽ trả về light hoặc dark, từ đó Colors sẽ trả về mảng màu tương ứng với chủ đề light hoặc dark.
  const color = Colors[colorScheme ?? 'light'];
  // trash[0]: vì trong biến trash có 1 object nên index là 0.
  // trash[0]?.organic: là dữ liệu từ organic
  // trash[0]?.inOrganic: là dữ liệu từ inOrganic.
  // dữ liệu của biến trash: {"id": 1, "inOrganic": "5.0", "organic": "3.0"}
  // dữ liệu tính trên thang 100% nên lấy 100 - trash[0]?.organic = % còn lại.
  const organic = [trash[0]?.organic, 100 - trash[0]?.organic];
  const inOrganic = [trash[0]?.inOrganic, 100 - trash[0]?.inOrganic];
  // Log
  const log = () => {
    console.log(
      'isAuthenticated: ', isAuthenticated,
      '\nuser: ', user,
      '\nTrash: ', trash[0]
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      {/* <StatusBar backgroundColor={'#12283d'} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Image style={styles.userImg} source={require('../../assets/images/e-lok.jpg')} resizeMode='cover' />

            <View>
              <Text style={[styles.welcomeText, { color: color.text }]}>Welcome</Text>
              <Text style={[styles.userText, { color: color.text }]}>{user?.username || 'TuanPham'}</Text>
            </View>
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

        <View style={[styles.energyContainer, { backgroundColor: '#0e1e2d' }]}>
          <View style={styles.energyWrap}>
            <View style={styles.detailContainer}>
              <FontAwesome6 name="circle-nodes" size={24} color={color.onText} />
              <Text style={{ color: color.onText, marginLeft: 5 }}>Energy usage</Text>
            </View>

            <View style={styles.detailContainer}>
              <FontAwesome6 name="calendar-plus" size={24} color={color.onText} />
              <Text style={{ color: color.onText, marginLeft: 5 }}>12/9/2024</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.detailContainer}>
              <View style={{ backgroundColor: '#00aeae', borderRadius: 100, padding: 7, marginRight: 10 }}>
                <FontAwesome6 name="plug-circle-bolt" size={20} color={color.onText} />
              </View>

              <View>
                <Text style={{ color: color.onText }}>Today</Text>
                <Text style={{ color: color.onText, fontWeight: 'bold' }}>28.6 kMh</Text>
              </View>
            </View>

            <View style={{ height: '100%', width: 1, backgroundColor: color.onText }}></View>

            <View style={styles.detailContainer}>
              <View style={{ backgroundColor: '#ff6897', borderRadius: 100, padding: 7, marginRight: 10 }}>
                <MaterialIcons name="electric-bolt" size={24} color={color.onText} />
              </View>

              <View>
                <Text style={{ color: color.onText }}>This month</Text>
                <Text style={{ color: color.onText, fontWeight: 'bold' }}>678.6 kMh</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.chartContainer, { backgroundColor: color.card }]}>
          <View style={styles.pieChartContainer}>
            <Text style={{ color: color.onText, fontWeight: 'bold' }}>Organic waste</Text>
            <PieChart
              style={{ marginVertical: 10 }}
              widthAndHeight={100}
              series={organic}
              sliceColor={['green', color.onText]}
            />
            <Text style={{ color: color.onText }}>{organic}%</Text>

          </View>

          <View style={styles.pieChartContainer}>
            <Text style={{ color: color.onText, fontWeight: 'bold' }}>Inorganic waste</Text>
            <PieChart
              style={{ marginVertical: 10 }}
              widthAndHeight={100}
              series={inOrganic}
              sliceColor={['tomato', color.onText]}
            />
            <Text style={{ color: color.onText }}>{inOrganic}%</Text>
          </View>
        </View>

        <View style={styles.otherDeviceContainer}>
          <ControlCard
            title='Living Room'
            devices={5}
            icon={<AntDesign name='home' size={24} color={color.onText} />}
          />
          <ControlCard
            title='Kitchen Room'
            devices={4}
            icon={<MaterialIcons name="kitchen" size={24} color={color.onText} />}
          />
          <ControlCard
            title='Bedroom'
            devices={4}
            icon={<Ionicons name="bed" size={24} color={color.onText} />}
          />
          <ControlCard
            title='Bathroom'
            devices={3}
            icon={<FontAwesome5 name="bath" size={24} color={color.onText} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

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
});
