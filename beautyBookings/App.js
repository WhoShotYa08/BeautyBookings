import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen, ProfileScreen } from './src/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from './src/screens/onBoarding';
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  HeaderShown: false,
  tabBarStyle:{
    postion: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff'
  }
}

export default function App() {
  return (
      <Onboarding />

    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen 
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         tabBarIcon: ({focused})=>{
    //           return(
    //             <View>
    //               <Entypo 
    //               name='home' size={24} color={focused? "#16247d" : "#111"}
    //               />
    //               <Text>Home</Text>
    //           </View>
    //           )

    //         }
    //       }} 
    //     />
    //     <Tab.Screen name="Profile" component={ProfileScreen}/>
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  darkCircle: {
    borderRadius: 300/2,
    height: 300,
    width: 300,
    backgroundColor: "#7434A4",
    top: -90,
    right: 90
  },

  lightCircle: {
    borderRadius: 320/2,
    height: 320,
    width: 320,
    backgroundColor: "#D1A4F3",
    top: -45,
    right: 160
  },

  circles:{
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row'
  }
});
