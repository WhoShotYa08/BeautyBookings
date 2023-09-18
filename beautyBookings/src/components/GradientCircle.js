import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientCircle() {
    return (

        <View style={styles.oval}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
            >
                <View ></View>
            </LinearGradient>
        </View>
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
 


