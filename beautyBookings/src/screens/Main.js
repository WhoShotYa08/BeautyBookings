import { SafeAreaView, View, TouchableOpacity, ImageBackground, Image, Text} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/FontAwesome';
import { collection, where, getDocs, query, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../components/db/firebase_";


const Content = ({imgLink, name}) =>{

    return(
    <View style={{flex: 1, borderWidth: 1, margin: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity  style={{height:50, width: 50, borderRadius: 50/2, backgroundColor: '#7434A4', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height:47, width: 47, borderRadius: 47/2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <Image 
                            source={{uri: imgLink}}
                            style={{width: 45, height: 45, borderRadius: 45/2}}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={{fontSize: 17, fontWeight: '600', marginHorizontal: 4}}>too_smooth.ww</Text>
            </View>

            <View style={{flex: 1, justifyContent:'center', alignItems: 'flex-end', paddingHorizontal: 5}}>
                <TouchableOpacity>
                    <Icon 
                        name='ellipsis1'
                        size={32}
                    />
                </TouchableOpacity>
            </View>




        </View>

        <View style={{flex: 1, backgroundColor: 'black'}}>
           
        </View>

        <View style={{height: 250}}>
            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
                    <TouchableOpacity>
                        <Icon name='hearto' size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Font name='comment-o' size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Feather name='send' size={30}/>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Feather name='bookmark' size={30} />
                </View>
            </View>

        </View>

    </View>
)}


export default function MainScreen(){
    const [service, setService] = useState([]);

    async function salonData(){
        const docRef = query(collection(db, "salonDetails"))
        const data = await getDocs(docRef);

        data.forEach((doc)=>{
            // console.log(doc.data()['services']["1"])
            
        })
    }

    setTimeout(salonData, 0)
    return(
        <SafeAreaView style={{flex: 1}}>
            <Content/>
        </SafeAreaView>
    )
}