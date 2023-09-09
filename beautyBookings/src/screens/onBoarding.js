import Onboarding from "react-native-onboarding-swiper";
import styles from "./Style";
import { TouchableOpacity, Image, SafeAreaView, View } from "react-native";

export default function OnboardingScreen(){
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.circles}>
                <View style={styles.darkCircle}></View>
                <View style={styles.lightCircle}></View>
            </View>
            
            <Onboarding 
                
                pages={
                    [{
                        backgroundColor: "white",
                        image: <Image style={styles.img} source={require("../images/fashion-blogger.png")}/>,
                        title: "fashion Blogger",
                        subtitle: "Help  you find the best hairdressers in town and book the most suitable appointments for you"
                    },

                    {
                        backgroundColor: "white",
                        image: <Image style={styles.img} source={require("../images/online-chat.png")}/>,
                        title: "Online Chatting",
                        subtitle: "Communicate your preffered style with the hairdresser and book the slot available according to their calender"
                    },

                    {
                        backgroundColor: "white",
                        image: <Image style={styles.img} source={require("../images/meetme.png")}/>,
                        title: "Notifications",
                        subtitle: "Recieve push notifications going towards your booking date to make sure you never forget"
                    }
                
                ]
                }
            />
        </SafeAreaView>
    )
}