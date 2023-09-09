import Onboarding from "react-native-onboarding-swiper";
import styles from "./Style";
import { TouchableOpacity, Image } from "react-native";

export default function OnboardingScreen(){
    return(

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

    )
}