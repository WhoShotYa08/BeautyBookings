import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Btn({text, func}){
    return(
        <TouchableOpacity style={styles.btn} onPress={func}>
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

    btn: {
        width: "65%",
        padding: 15,
        borderRadius: 7,
        textAlign: 'center',
        backgroundColor: '#7434A4',
        marginVertical: 20,
    },
})