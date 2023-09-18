import { View } from "react-native";
import styles from "../screens/Style";

export default Circles = () =>{
    return(
        <View style={styles.circles}>
            <View style={styles.darkCircle}></View>
            <View style={styles.lightCircle}></View>
        </View>
    )
}