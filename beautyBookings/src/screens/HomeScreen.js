import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from "react";
import styles from "./Style";
import { ScrollView } from "react-native-gesture-handler";
import { collection, getDocs, query,} from 'firebase/firestore';
import { db } from "../components/db/firebase_";


function SaloonDetials({imgLink, name, address, workingHours, rating}){
    const [liked, setLiked] = useState(false)

    const icon = liked? "heart": "hearto";
    const heartColor = liked? 'red': '#fff';

    return(
        <View style={{flexDirection: 'row', borderBottomWidth: 1, padding: 10, width: '100%', flexWrap: 'wrap'}}>
            <View style={{flex: 1}}>
                <ImageBackground source={{uri:imgLink}} 
                    style={{height: 125, width: 125, marginRight: 10, alignItems: 'flex-end', justifyContent:'flex-end', padding: 7}}
                >
                    <TouchableOpacity onPress={()=>setLiked(!liked)}>
                        <Icon name={icon} size={21} color={heartColor}/>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            <View style={{flex: 2, paddingHorizontal: 20, marginLeft: 15}}>
                <Text style={{fontWeight: '700', fontSize: 21, flexWrap: 'wrap'}}>{name}</Text>
                <Text>{address}</Text>
                <Text style={{color: 'lightgrey'}}>{workingHours}</Text>

                <Stars rating={rating}/>

            </View>

        </View>
    );
}


function Stars({rating}){
    switch (rating){
        case 1:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                </View>
            )
        case 2:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                </View>
            )
        case 3:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="staro" size={24}/>
                    <Icon name="staro" size={24}/>
                </View>
            )
        case 4:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="staro" size={24}/>
                </View>
            )
        case 5:
            return(
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                    <Icon name="star" size={24} color={'orange'}/>
                </View>
            )
        default:
            return(
                <Text>No Rating</Text>
            )
    }
}



export default function HomeScreen(){

    async function GetDetails(){
        const saloonRef =  query(collection( db, "salonDetails"));
        const saloonSnap = await getDocs(saloonRef);
        setSalonList([]);
        saloonSnap.forEach((doc)=>{
            setSalonList((prev)=>[...prev, doc.data()]);
        })
    }
    const [salonList, setSalonList] = useState([]);

    useEffect(()=>{GetDetails()},[])
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

            <ScrollView>
                {
                    salonList.map((item, idx)=>{

                        let name = item['details'].name;

                        return(
                            <TouchableOpacity style={{flexWrap: 'wrap'}} key={idx}>
                                <SaloonDetials
                                    imgLink={item['image']}
                                    name={item['details'].name}
                                    address={item['details'].address}
                                    workingHours={item['details'].workingHours}
                                    rating={parseInt(item['details'].rating)}
                                />
                            </TouchableOpacity>
                        )
                        // let name = item.name.toLowerCase();

                    })
                }
            </ScrollView>

        </SafeAreaView>
    )
}
