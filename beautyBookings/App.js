import React, { useContext } from 'react';
import { HomeScreen, ProfileScreen, Onboarding, Registration } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from './src/screens/LandingScreen';
import UserContextWrapper, { UserContext } from './src/components/context/user';
import OTP from './src/screens/OTP';


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

const RootNavigator = () =>{
  //recent change to enable user to go to profile if user is verified
  const {user} = useContext(UserContext);

  return user  ? <AppNavigation /> : <WelcomeNavigation />
}


const WelcomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={LandingScreen} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Registration' component={Registration} />

    </Stack.Navigator>
  )
}

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='OTP'>
      <Stack.Screen name='OTP' component={OTP} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

