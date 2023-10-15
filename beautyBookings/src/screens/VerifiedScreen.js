import { Text, Animated, SafeAreaView } from "react-native";
import React from "react";
import styles from "./Style";
import LottieView from 'lottie-react-native';

export default function VerifiedScreen({navigation}){

    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#7434A4',justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View style={{flex: 1}}>
                <LottieView 
                    source={require("../assets/verify.json")}
                    autoPlay
                    loop={false}
                    resizeMode="cover"
                    onAnimationFinish={() =>navigation.navigate("Profile")}
                />
            </Animated.View>
        </SafeAreaView>
    )
}