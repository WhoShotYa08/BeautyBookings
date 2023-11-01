import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from 'react-native';
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { collection, query, onSnapshot, getDocs, doc } from "firebase/firestore";

const Screen1 = ({ navigation }) => {
    const [users, setUsers] = useState(null);

    const { user } = useContext(UserContext);
    const { uid } = user

    const businessId = uid

    useEffect(() => {
        const unsub = onSnapshot(doc(db, `/salonDetails/${businessId}`), async (doc) => {
            const userArray = doc.data().messages
            const q = query(collection(db, "users"));

            const querySnapshot = await getDocs(q);

            const users = []
            querySnapshot.forEach((doc) => {
                if (userArray.includes(doc.id || "")) {
                    users.push({ id: doc.id, name: doc.data().name })
                }
            });

            setUsers(users)
        });

        return () => unsub()
    }, [])

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Chat", item.id)}
                        style={{
                            padding: 10,
                            backgroundColor: "purple",
                            marginBottom: 5,
                            marginTop: 5,
                            borderRadius: 5,
                            marginHorizontal: 10
                        }}>
                        <Text style={{
                            color: "#fff",
                            padding: 10,
                            fontSize: 16
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
});

export default Screen1;