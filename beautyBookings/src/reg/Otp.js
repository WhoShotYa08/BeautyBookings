import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";

import { SafeAreaView } from "react-native-safe-area-context"


export default function Otp({ params, navigation }) {
    const otp = params.otp
    const [userOTP, setUserOTP] = useState("");

    function verifyOTP(otp, userOTP){
        if(otp === userOTP){
            Alert.alert("Oops", "Your OTP is incorrect", [{
                text: "Ok"
            }])
        }
        else{
            navigation.navigate("Login");
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.formView}>
                <Text>Confirmation</Text>
                <TextInput
                    placeholder="Enter OTP"
                    onChangeText={(value) => setUserOTP(value)}
                />
                <TouchableOpacity style={styles.submit} onPress={verifyOTP}>
                    <View>
                        <Text style={styles.submitText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

