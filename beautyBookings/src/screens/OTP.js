import { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import { TextInput } from "react-native-gesture-handler";


export default function OtpScreen(){
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