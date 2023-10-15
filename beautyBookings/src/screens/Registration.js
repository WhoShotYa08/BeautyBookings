import { SafeAreaView, View, Text, TextInput, Switch, KeyboardAvoidingView, ScrollView} from "react-native";
import styles from "./Style";
import Circles from "../components/Circles";
import Toggle from "../components/Toggle";
import GradientCircle from "../components/GradientCircle";
import { LinearGradient } from 'expo-linear-gradient';

export default function Registration(){
    return(
        <SafeAreaView style={{flex: 1}}>

            
            <View style={[styles.main]}>
                <View style={[styles.pageContainer]}>
                    
                    <View style={[{alignItems:'center', width: "auto"}]}>
      
                        <Toggle />
                
                    </View>
  
                </View>
            </View>
            <LinearGradient
                colors={[ "#D1A4F3", "#7434A4" ]}
                style={{
                  height: 270,
                  width : 220,
                  borderRadius: 270/2, 
                  zIndex: 10,
                  position: 'absolute',
                  bottom: -35,
                  left: -50,
                  transform: [{skewY: '30deg'}],
                }}
            >
            </LinearGradient>
        </SafeAreaView>
    )
}