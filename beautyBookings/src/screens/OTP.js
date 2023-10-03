import { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View, ToastAndroid} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { generateOtp } from "../components/Toggle";



export default function OtpScreen(){
    const [otpText, setOtpText] = useState("")
    const userOTP = generateOtp();
    // const {otp} = route.params;
    // console.log(typeof userOTP);
    
    // const uOTP = Number(otpText.trim());
    // console.log(typeof uOTP);
    const verifyOtp = () => {
        if(userOTP == parseInt(otpText)){
            navigation.navigate("Profile");
            console.log(userOTP, otpText)
        }
        else{
            // ToastAndroid.showWithGravityAndOffset(
            //     "Incorrect OTP, please double check the email we've sent you",
            //     ToastAndroid.LONG,
            //     ToastAndroid.TOP
            // );
            console.log("Shit");
            console.log(userOTP, otpText)
        }
    }
    return(
        <SafeAreaView style={styles.main}>
            <View>
                <TextInput 
                    style={styles.inputBox}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        borderWidth: 1
    }
})