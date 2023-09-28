import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BeautySignUp from "./newSignUp";
import Otp from "./Otp";

const tabNav = createNativeStackNavigator();


export default function Nav(){
    
    return(
        <tabNav.Navigator initialRouteName="Sign Up">
            <tabNav.Screen name="Sign Up" component={BeautySignUp}></tabNav.Screen>
            <tabNav.Screen name="OTP" component={Otp}></tabNav.Screen>
        </tabNav.Navigator>
    )
}