import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState } from "react";
import styles from "./Style";
import { ScrollView } from "react-native-gesture-handler";
import { collection, where, getDocs, query, doc } from 'firebase/firestore';
import { db } from "../components/db/firebase_";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";



const businesses = [
    {
        name: "GGS New Star Hair & Beauty Saloon",
        location: "Alberton",
        time: "08:00 - 20:00",
        imgLink: require("../images/salon1.jpg"),
        rating: 4,
        contact: "068 296 0139",
    },
    {
        name: "Gugu Hair Saloon",
        location: "Johannesburg",
        time: "08:00 - 16:00",
        imgLink: require("../images/salon2.jpg"),
        rating: 2,
        contact: "068 296 0139",
    },
    {
        name: "sun shine barber & beauty saloon",
        location: "Alberton",
        time: "08:00 - 20:00",
        imgLink: require("../images/salon1.jpg"),
        rating: 5,
        contact: "068 296 0139",
    },
    {
        name: "JL GLAM STRANDS AND BEAUTY",
        location: "Alberton",
        time: "08:00 - 20:00",
        imgLink: require("../images/salon4.jpg"),
        rating: 4,
        contact: "068 296 0139",
    },
    {
        name: "GGS New Star Hair & Beauty Saloon",
        location: "Alberton",
        time: "08:00 - 20:00",
        imgLink: require("../images/salon1.jpg"),
        rating: 4,
        contact: "068 296 0139",
    },
    {
        name: "GGS New Star Hair & Beauty Saloon",
        location: "Alberton",
        time: "08:00 - 20:00",
        imgLink: require("../images/salon5.jpg"),
        rating: 4,
        contact: "068 296 0139",
    },

]


function SaloonDetials({imgLink, name, address, workingHours}){
    const [liked, setLiked] = useState(false)

    const icon = liked? "heart": "hearto";
    const heartColor = liked? 'red': '#fff';

    return(
        <View style={{flexDirection: 'row', borderBottomWidth: 1, padding: 10}}>
            <View>
                <ImageBackground source={imgLink} 
                    style={{height: 125, width: 125, marginRight: 10, alignItems: 'flex-end', justifyContent:'flex-end', padding: 7}}
                >
                    <TouchableOpacity onPress={()=>setLiked(!liked)}>
                        <Icon name={icon} size={21} color={heartColor}/>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            <View style={{flexWrap: 'wrap'}}>
                <Text style={{fontWeight: '700', fontSize: 16, flexWrap: 'wrap',}}>{name}</Text>
                <Text>{address}</Text>
                <Text>{workingHours}</Text>

                <View style={{flexDirection: 'row'}}>

                </View>
            </View>

        </View>
    );
}


export default function HomeScreen({navigation}){

    const [salonList, setSalonList] = useState([]);

    async function GetDetails(){
        const saloonRef =  query(collection( db, "salonDetails"));
        const saloonSnap = await getDocs(saloonRef);

        saloonSnap.forEach((doc)=>{
            setSalonList((prev)=>[...prev, doc.data["details"]]);
            console.log(salonList.length)
        })
    }

    setTimeout(GetDetails,1000);
    const [word, setWord]= useState('');
    return(
        <SafeAreaView style={{flex: 1}}>
            <View 
                style={{
                    padding: 9, 
                    margin: 15, 
                    flexDirection:'row', 
                    justifyContent: 'space-between', 
                    borderWidth:1,
                    borderRadius: 10,
                    borderColor: 'lightgrey'
                }}
                
                >
                <TouchableOpacity>
                    <Icon name="search1" size={24}/>
                </TouchableOpacity>
                
                <TextInput
                    style={{flex:1, paddingHorizontal: 7, fontSize: 16}}
                    placeholder="Search"
                    onChangeText={text =>setWord(text)}
                />
            </View>

            <Text style={{fontSize: 27, fontWeight:'600', textAlign: 'center'}}>Registered Businesses</Text>
            <Btn text={"Chat"} func={ () =>navigation.navigate("Chat") } />
            <ScrollView>
                {
                    salonList.map((item, idx)=>{
                        let name = item.name.toLowerCase();

                        if (name.includes(word.toLowerCase())){
                            return(
                                <TouchableOpacity key={idx} style={{marginBottom: 10}}>
                                    <SaloonDetials 
                                        imgLink={item.imgLink}
                                        name={item.name}
                                        address={item.location}
                                        workingHours={item.time}
                                    />
                                </TouchableOpacity>
                            )
                        }

                    })
                }
                
            </ScrollView>

        </SafeAreaView>
    )
}
