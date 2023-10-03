import { Button, SafeAreaView, Text } from "react-native";
import React from "react";
import styles from "./Style";
import { doLogout } from "../components/minddlewares/auth";
import Btn from "../components/Btn";


export default function ProfileScreen(){
    return(
        <SafeAreaView style={styles.main}>
            <Text>Portfolio Screen</Text>
            {/* <Button title="Logot" onPress={doLogout}/> */}
            <Btn text={'Logout'} func={doLogout}/>
        </SafeAreaView>
    )
}