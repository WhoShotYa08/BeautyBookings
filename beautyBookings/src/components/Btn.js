import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Btn({text, func, color}){

    const btn= {
        width: "65%",
        padding: 15,
        borderRadius: 7,
        textAlign: 'center',
        backgroundColor: color == undefined? '#7434A4': color,
        marginVertical: 20,
    }

    return(
        <TouchableOpacity style={btn} onPress={func}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        textAlign: 'center', 
        color: 'white'
    },
})