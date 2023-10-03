import { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import { TextInput } from "react-native-gesture-handler";


export default function OtpScreen(){
    return(
        <SafeAreaView>
            <View>
                <TextInput 
                    style={styles.inputBox}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1
    }
})