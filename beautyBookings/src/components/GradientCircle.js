import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientCircle() {
    return (
            <LinearGradient
                colors={[ "#D1A4F3", "#7434A4" ]}
                style={{
                  height: 270,
                  width : 220,
                  borderRadius: 210/2, 
                  zIndex: 10,
                  position: 'absolute'
                }}
            >
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },

  oval:{
    width: 300,
    height: 300,
    broderRaduis: 300/2,
}
});
 


