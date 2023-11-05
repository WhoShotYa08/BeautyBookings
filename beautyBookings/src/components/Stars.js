import { Text, View} from "react-native";
import  Entypo from "react-native-vector-icons/Entypo";


export default function Stars({rating}){
    switch (rating){
        case 1:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                </View>
            )
        case 2:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                </View>
            )
        case 3:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star-outlined" size={20}/>
                    <Entypo name="star-outlined" size={20}/>
                </View>
            )
        case 4:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star-outlined" size={20}/>
                </View>
            )
        case 5:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                    <Entypo name="star" size={20} color={'orange'}/>
                </View>
            )
        default:
            return(
                <Text>No Rating</Text>
            )
    }
}