import React from 'react';
import { HomeScreen, ProfileScreen, Onboarding, Registration } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from './src/screens/LandingScreen';


const Tab = createStackNavigator();

export default function App() {  
  
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Splash" component={LandingScreen} />
          <Tab.Screen name='Onboarding' component={Onboarding} />
          <Tab.Screen name='Registration' component={Registration} />
          <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
      </NavigationContainer>

  );
}


