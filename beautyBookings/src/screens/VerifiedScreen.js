import { Text, Animated, SafeAreaView } from "react-native";
import React from "react";
import styles from "./Style";
import LottieView from 'lottie-react-native';

export default function VerifiedScreen({navigation}){

    return(
        <SafeAreaView style={{flex: 1, backgroundColor:'#7434A4',}}>
            <Animated.View style={{flex: 1, padding: 20}}>
                <LottieView 
                    source={require("../assets/purpleVerify.json")}
                    autoPlay
                    loop={false}
                    resizeMode="contain"
                    onAnimationFinish={() =>navigation.navigate("TopNav")}
                />
            </Animated.View>
        </SafeAreaView>
    )
}