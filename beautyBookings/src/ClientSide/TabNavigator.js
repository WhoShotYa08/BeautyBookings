import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen1 from './Business(Existing)';
import Screen2 from './Business(Add)';
import Screen3 from './Business(chat)';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   style: {
      //     backgroundColor: 'rgb(203, 195, 227)',
      //   },
      //   labelStyle: {
      //     fontWeight: 'bold',
      //     textTransform: 'capitalize',
      //     color: 'black',
      //   },
      //   indicatorStyle: {
      //     backgroundColor: 'rgb(135,31,120)',
      //   }
      // }
      screenOptions={{
        style: {
          backgroundColor: 'rgb(203, 195, 227)',
        },
        labelStyle: {
          fontWeight: 'bold',
          textTransform: 'capitalize',
          color: 'black',
        },
        indicatorStyle: {
          backgroundColor: 'rgb(135,31,120)',
        }
      }
      }>
      <Tab.Screen name="Current Business Profile" component={Screen1} />
      <Tab.Screen name="Update Business Profile" component={Screen2} />
      <Tab.Screen name="chats" component={Screen3} />
    </Tab.Navigator>
  )

};

export default TabNavigator;