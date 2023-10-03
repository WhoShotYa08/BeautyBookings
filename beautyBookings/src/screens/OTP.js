import { useState } from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import sty from "./Style";
import GradientCircle from "../components/GradientCircle";import { generateOtp } from "../components/Toggle";



export default function OtpScreen(){
    const [one, setOne] = useState();
    const [two, setTwo] = useState();
    const [three, setThree] = useState();
    const [four, setFour] = useState();
    const [five, setFive] = useState();
    const [six, setSix] = useState();
    const [final, setFinal] = useState()

    const handleFinalOTP = () =>{
        let code = one + two + three+ four+ five + six
        setFinal(code)
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <Text style={[sty.header, {textAlign: 'center', padding: 15}]}>Confirmation</Text>

            <View style={styles.main}>
                <Text>Enter code sent to</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setOne(t)}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setTwo(t)}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setThree(t)}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setFour(t)}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setFive(t)}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        numberOfLines={1}
                        maxLength={1}
                        onChangeText={(t)=>setSix(t)}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.btn}
                    onPress={handleFinalOTP}
                >
                    <Text style={styles.btnText}>
                        Verify
                    </Text>
                </TouchableOpacity>

            </View>
            {/* <GradientCircle/> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    inputBox: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 3,
        textAlign: 'center',
        marginVertical: 10
    },

    btnText:{
        fontSize: 19, 
        marginVertical: 20, 
        borderWidth: 1, 
        padding: 10,
        textAlign: "center"
    },
    btn:{

    }
})