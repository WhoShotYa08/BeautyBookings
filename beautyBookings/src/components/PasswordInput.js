import { View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PasswordInput({show}){

    const icon = show? 'eye': 'eye-slash';

    return(
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: 10, borderWidth: 1}}>
            <TextInput 
                placeholder="Password"
                style={{flex: 1}}
            />
            <Icon name={icon} size={24}/>
        </View>
    )
}