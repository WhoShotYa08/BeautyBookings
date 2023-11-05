import { View, SafeAreaView, Text, ImageBackground, TouchableOpacity, Image, ToastAndroid, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Style";
import { doLogout } from "../components/minddlewares/auth";
import { collection, where, getDocs, query, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView } from "react-native-gesture-handler";
import Btn from "../components/Btn";
import { getAuth, deleteUser, sendPasswordResetEmail } from "firebase/auth";


function User({ name, surname, email, cell }) {
    return (
        <View style={{ alignItems: 'center', bottom: "10%" }}>
            <TouchableOpacity style={{
                backgroundColor: 'white', alignItems: 'center', borderRadius: 100, height: 150, width: 150, justifyContent: 'center'
            }}>
                <Icon name="user" size={100} />
            </TouchableOpacity>

            <Text style={{ fontSize: 32, textAlign: 'center', fontWeight: '700' }}>{name + " " + surname}</Text>
            <Text>{email}</Text>
            <Text style={{ color: 'lightgrey' }}>{cell}</Text>
        </View>
    )
}

function FavHair({ img, id }) {
    return (
        <View style={{ marginHorizontal: 8 }} key={id}>
            <Image
                style={{ height: 125, width: 125, borderRadius: 20 }}
                source={img}
            />
        </View>
    )
}

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');



    async function userData() {
        const docRef = query(collection(db, "users"), where("email", "==", user["user"].email));
        const data = await getDocs(docRef);

        data.forEach((doc) => {
            setName(doc.data().name);
            setSurname(doc.data().surname);
            setEmail(doc.data().email);
            setCell(doc.data().cellNo);
        })
    }


    setTimeout(userData, 0)

    const user = useContext(UserContext);
    const faveHairStyles = [
        require('../images/salon1.jpg'),
        require('../images/salon2.jpg'),
        require('../images/salon4.jpg'),
        require('../images/salon5.jpg'),
    ];

    const deleteAccount = () => {
        currentUser = user["user"].uid;
        console.log(currentUser);

        const auth = getAuth();
        const userAcc = auth.currentUser;
        console.log("b4");
        deleteUser(userAcc).then(() => {
            console.log("in process");
            deleteDoc(doc(db, "users", currentUser));
            ToastAndroid.showWithGravity(
                "Account Deleted",
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            console.log("after remove");
            doLogout();
            console.log(currentUser);
            console.log("done");
        }).catch((error) => {
            ToastAndroid.showWithGravity(
                error.toString(),
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            console.log(error);
        });
        console.log("over");
    }

    const { hairstyles } = useContext(UserContext);
    const list = Object.values(hairstyles);

    const Update = async () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                ToastAndroid.showWithGravity(
                    "Reset Email Sent",
                    ToastAndroid.LONG,
                    ToastAndroid.TOP
                )
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    // console.log(hairstyles)
    // console.log(list)
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
            <View style={{ height: '20%', width: '100%' }}>
                <ImageBackground source={require("../images/purpleBackground.jpg")} resizeMode="cover"
                    style={{ flex: 1, }}
                >
                    <TouchableOpacity onPress={doLogout}>
                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 15, padding: 10 }}>Logout</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>

            <User
                name={name}
                surname={surname}
                email={email}
                cell={cell}
            />


            <ScrollView style={{ borderWidth: 2 }}>
                <Text style={{ paddingHorizontal: 10, fontSize: 22, marginBottom: 8, fontWeight: '700' }}>Favourite Hair Styles</Text>

                <ScrollView horizontal style={{ borderWidth: 2 }}>
                    {

                        // faveHairStyles.map((item, index) => (
                        //     <View key={index}>
                        //         <FavHair img={item} id={index} />
                        //         {/* <Text>{list['favourite']}</Text> */}
                        //     </View>
                        // ))
                        // list.map((item)=><Text>{item.favourite}</Text>)
                        useEffect(() => {
                            list.map((item, idx) => {

                                return (
                                    <View key={idx}>
                                        <Image
                                            source={item.imgLink}
                                            style={{ height: 125, width: 125, borderRadius: 20, borderRadius: 1 }}
                                        />
                                    </View>)
                            })

                        }, list)
                    }

                </ScrollView>


            </ScrollView>
            <Btn text={"Delete Account"} color={"#d11a2a"} func={deleteAccount} />
        </SafeAreaView>

    )
}