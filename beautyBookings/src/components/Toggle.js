import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import Circles from "./Circles";

const SignUp = () => {
    return(
        <View style={styles.main}>
            <Element icon={""} placeHolder={"Email"}/>
            <Element icon={""} placeHolder={"Password"}/>
            <Element icon={""} placeHolder={"Password"}/>
        </View>
    )
}

const Login = () => {
    return(
        <View style={styles.main}>
            <Element icon={""} placeHolder={"Email"}/>
            <Element icon={""} placeHolder={"Password"}/>
        </View>
    )
}

const Element = ({icon, placeHolder}) =>{
    return(
    <View style={{flexDirection: 'row', marginVertical: 7}}>
        <TextInput 
            placeholder={placeHolder}
            style={[styles.input, styles.shadow]}
        />

        <Icon name = {icon} backgroundColor = "#fff" size={20}/>

    </View>);
}


export default function Toggle(){
    const [active, setActive] = useState(true);

    const Pages = ({selected, text}) =>{

        backgroundColor = selected ? "#7434A4" : "#fff"; 
        color = selected ? "white" : 'black';
        fontWeight = selected ? "bold": 'light';
        shadowTime = selected ? styles.shadow : '';

        return(
            <TouchableOpacity style={[styles.tgStyle,{backgroundColor}, shadowTime]} onPress={()=> setActive(!active)}>
                <Text style={[styles.text,{color, fontWeight}]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View>
            <View style={[styles.toggle]}>
                <Pages selected={active} text={"Login"} /> 
                <Pages selected={!active} text={"Sign Up"} />
            </View>
            
            {
                active? <Login /> : <SignUp />
            }
        </View>


    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    toggle:{
        width:"80%",
        borderWidth: 0.5,
        alignSelf: 'center',
        height: 55,
        borderRadius: 15, 
        marginTop: '10%',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },

    tgStyle: {
        width: "45%",
        height: "90%",
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 15,
        marginHorizontal: 7
    },

    text:{
        fontSize: 17,
    },

    input: {
        width: "85%",
        borderWidth: 1,
        padding: 7,
        fontSize: 15,
        borderRadius: 7,
        textAlign: 'center'
    },

    shadow:{
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 7},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})