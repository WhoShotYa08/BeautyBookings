import { SafeAreaView, View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from 'react';
import Btn from "../components/Btn";
import { Stars } from "./HomeScreen";
import { ScrollView } from "react-native-gesture-handler";
export default function Salon({route}){


    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["5%", '25%', '50%', "75%"], []);

    const item = route?.params?.itm;
    const details = item['details'];
    const reviews = item['reviews'];
    return(
        <SafeAreaView style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <Text>Salon screen</Text>
            <Text>{item['details'].name}</Text>

            <BottomSheet
                snapPoints={snapPoints}
                // backgroundStyle={{backgroundColor:'#7434A4'}}
            >
                <View style={[styles.contentContainer,{padding: 10,}]}>
                    <Text style={{fontSize: 24, fontWeight: '900', }}>{item['details'].name}</Text>
                    <Stars rating={parseInt(item['details'].rating)}/>
                </View>

                <View style={{width: '100%', height: "40%"}}>
                    <ImageBackground
                        source={{uri: item['image']}}
                        style={{flex: 1, backgroundColor: 'black', opacity: .3}}
                        resizeMode='cover'
                    >


                    </ImageBackground>
                </View>
                <ScrollView horizontal style={{flex: 1, bottom: "21%"}}>
                    {
                        Object.values(item['xtraPics']).map((element, idx)=>{
                            return(
                                <View style={{}} key={idx}>
                                    <Image
                                        source={{uri: element}}
                                        style={{height: 125, width: 125, borderRadius: 15, margin: 5}}
                                    />
                                </View>)       
                        })
                    }
                </ScrollView> 
                <Text>Will I ever be good enough</Text>                      

            </BottomSheet>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      width: '100%',
      backgroundColor: 'grey',
    },
    contentContainer: {

      alignItems: 'center',
    },
  });