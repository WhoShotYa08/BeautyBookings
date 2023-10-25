import { SafeAreaView, View, Text } from "react-native";

export default function Salon({route}){

    const item = route?.params?.itm;
    return(
        <SafeAreaView style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Text>Salon screen</Text>
        </SafeAreaView>
    )
}