import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, ProfileScreen } from './index';

const Tab = createMaterialTopTabNavigator();

export default function TopNav() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}