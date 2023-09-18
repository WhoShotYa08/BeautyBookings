import { SafeAreaView, View, Text, TextInput, Switch, } from "react-native";
import styles from "./Style";
import Circles from "../components/Circles";
import Toggle from "../components/Toggle";
import GradientCircle from "../components/GradientCircle";


export default function Registration(){
    return(
        <SafeAreaView style={{flex: 1}}>

            {/* <Circles /> */}

            <View style={[styles.main]}>
                <View style={[styles.pageContainer]}>
                    <View style={[{alignItems:'center', width: "auto"}]}>
                        <Toggle />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}