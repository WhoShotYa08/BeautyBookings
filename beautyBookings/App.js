import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { HomeScreen, ProfileScreen } from './src/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from './src/screens/onBoarding';
import { Entypo } from "@expo/vector-icons";
import LandingScreen from './src/screens/LandingScreen';

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

  const [isLoading, setIsLoading] = useState(true)
  return isLoading? <LandingScreen func={setIsLoading}/> : <Onboarding />
  
  
  return (
    <Onboarding />
    // <SafeAreaView style={styles.container}>
    //   <NavigationContainer>
    //     <Tab.Navigator>
    //       <Tab.Screen 
    //         name="Home"
    //         component={HomeScreen}
    //         options={{
    //           tabBarIcon: ({focused})=>{
    //             return(
    //               <View>
    //                 <Entypo 
    //                 name='home' size={24} color={focused? "#16247d" : "#111"}
    //                 />
    //                 <Text>Home</Text>
    //             </View>
    //             )

    //           }
    //         }} 
    //       />
    //       <Tab.Screen name="Profile" component={ProfileScreen}/>
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
