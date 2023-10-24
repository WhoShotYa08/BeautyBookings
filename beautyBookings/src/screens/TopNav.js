import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {HomeScreen, ProfileScreen} from './index';
import ChatBox from './Chatbox';
const Tab = createMaterialTopTabNavigator();

export default function TopNav() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Chat" component={ChatBox} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}