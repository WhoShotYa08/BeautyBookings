import { View, Text, Animated, Image } from "react-native";
import React, {useRef, useEffect} from "react";
import styles from "./Style";
import LottieView from 'lottie-react-native';

export default function LandingScreen({func}){

    const fadeIn = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
      }, [fadeIn]);

    return(
        <Animated.View style={{flex:1, justifyContent: 'center', alignItems: 'center', opacity: fadeIn}}>
            <LottieView 
                source={require("../assets/Welcome.json")}
                autoPlay
                loop={false}
                resizeMode="cover"
                onAnimationFinish={() =>func(false)}
            />

            <Image style={styles.img} source={require("../images/Logo.jpg")}/>
            <Text style={styles.header}>Beauty Bookings</Text>

        </Animated.View>
    )
}