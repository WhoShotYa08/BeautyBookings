import React, { useContext, useEffect, useState } from 'react';
import { HomeScreen, ProfileScreen, Onboarding, Registration } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from './src/screens/LandingScreen';
import UserContextWrapper, { UserContext } from './src/components/context/user';
import OTP from './src/screens/OTP';
import TabNavigator from './src/ClientSide/TabNavigator';
import VerifiedScreen from './src/screens/VerifiedScreen';
import ChatBox from './src/screens/Chatbox';
import { TopNav } from './src/screens';
import Salon from './src/screens/Salon';
import Appointment from './src/screens/Appointments';
import { HeaderContext } from './src/components/context/header';


const Stack = createStackNavigator();

export default function App() {

  return (
    <UserContextWrapper>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserContextWrapper>
  );
}

const RootNavigator = () => {
  const { user } = useContext(UserContext);

  return !user ? <WelcomeNavigation /> : user.userType ? <AppNavigation /> : <BusinessSide />
}

const WelcomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={LandingScreen} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Registration' component={Registration} />
      <Stack.Screen name='Verified' component={VerifiedScreen} />
    </Stack.Navigator>
  )
}

//This will only be accessed after you have logged in
const AppNavigation = () => {
  const { name } = useContext(HeaderContext)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='TopNav'>
      <Stack.Screen name='OTP' component={OTP} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Chat'
        options={{
          title: name,
          headerShown:true
        }}
        component={ChatBox} />
      <Stack.Screen name='Verified' component={VerifiedScreen} />
      <Stack.Screen name='TopNav' component={TopNav} />
      <Stack.Screen name="Salon" component={Salon} />
      <Stack.Screen name='Book Appointment' component={Appointment} />
    </Stack.Navigator>
  )
}

const BusinessSide = () => {
  const { name } = useContext(HeaderContext)
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNav" component={TabNavigator} />
      <Stack.Screen name='Chat'
        options={{
          title: name
        }}
        component={ChatBox} />
    </Stack.Navigator>
  )
}
