import { Button, SafeAreaView, Text } from "react-native";
import React from "react";
import styles from "./Style";
import { doLogout } from "../components/minddlewares/auth";
import Btn from "../components/Btn";


export default function ProfileScreen({navigation}){
    return(
        <SafeAreaView style={styles.main}>
            <Text>Profile Screen</Text>
            {/* <Button title="Logot" onPress={doLogout}/> */}
            <Btn text={'Logout'} func={doLogout}/>
            <Btn text={'Chat'} func={() => navigation.navigate("Chat")}/>
        </SafeAreaView>
    )
}