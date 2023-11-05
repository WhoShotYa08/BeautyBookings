import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from './ProfileScreen';
import HomeScreen from "./HomeScreen"
import MainScreen from './Main';
const Tab = createMaterialTopTabNavigator();

export default function TopNav() {
  return (
    <Tab.Navigator initialRouteName='Feed'>
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Feed" component={MainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}