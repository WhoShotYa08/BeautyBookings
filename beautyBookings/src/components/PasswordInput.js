import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PasswordInput({show}){

    const icon = show? 'eye': 'eye-slash';

    const styles = {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems: 'center', 
        padding: 7, 
        borderWidth: 1, 
        borderRadius: 7,
     
    }

    return(
        <View 
        style={styles}>
            <TextInput 
                placeholder="Password"
                style={{flex: 1}}
            />

            <TouchableOpacity>
                <Icon name={icon} size={24}/>
            </TouchableOpacity>
        </View>
    )
}