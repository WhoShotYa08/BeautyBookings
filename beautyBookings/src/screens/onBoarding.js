import Onboarding from "react-native-onboarding-swiper";
import styles from "./Style";
import { TouchableOpacity, Image, SafeAreaView, View } from "react-native";
import Arrow from "react-native-arrow"
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Circles from "../components/Circles";


const Rectangle = ({selected}) => {
    var backgroundColor, height;

    backgroundColor = selected ? "#7434A4" : "#D1A4F3";
    height = selected? 15 : 9;
    return (
        <View 
        style={{
            width: 28,
            height,
            marginHorizontal: 3,
            backgroundColor,
          }}    
        />
    )
}

const Arrows = () =>{
    return(
        <Arrow size={15} color="#D1A4F3"/>
    )
}




export default function OnboardingScreen(){
    // const navigation = useNavigation() 
    return(
        <SafeAreaView style={{flex: 1}}>
            <Circles />

            <Onboarding 
                DotComponent={Rectangle}
                NextButtonComponent={Arrows}
                allowFontScaling={false}
                bottomBarColor="white"
                // onDone={()=> navigation.navigate("Home")}

                pages={
                    [{
                        backgroundColor: "white",
                        image: <LottieView source={require("../assets/hairStylist.json")} autoPlay style={styles.img}/>,
                        title: "fashion Blogger",
                        subtitle: "Help  you find the best hairdressers in town and book the most suitable appointments for you"
                    },

                    {
                        backgroundColor: "white",
                        image: <LottieView source={require("../assets/chatting.json")} autoPlay style={styles.img}/>,
                        title: "Online Chatting",
                        subtitle: "Communicate your preffered style with the hairdresser and book the slot available according to their calender"
                    },

                    {
                        backgroundColor: "white",
                        image: <LottieView source={require("../assets/notification.json")} autoPlay style={styles.img}/>,
                        title: "Notifications",
                        subtitle: "Recieve push notifications going towards your booking date to make sure you never forget"
                    }
                
                ]
                }
            />
        </SafeAreaView>
    )
}