import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen, ProfileScreen } from './src/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from ""
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
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home"
          component={HomeScreen}
          options={(focused)=>{

          }} 
        />
        <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
