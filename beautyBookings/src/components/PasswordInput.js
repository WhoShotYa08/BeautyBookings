import { View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PasswordInput({show}){

    const icon = show? '': '';

    retutrn(
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
            <TextInput 
                placeholder="Password"
                style={{flex: 1}}
            />
            <Icon name={icon} size={24}/>
        </View>
    )
}