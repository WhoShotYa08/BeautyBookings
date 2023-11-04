import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";
import { doLogout } from "../components/minddlewares/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { doc, onSnapshot } from "firebase/firestore";

const Screen1 = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { uid } = user

  const [datails, setDetails] = useState()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, `/salonDetails/${uid}`), async (doc) => {
      setDetails({ ...doc.data(), id: doc.id })
    });
    return () => unsub()
  }, [])


  return (
    <View style={styles.container}>
      {datails ? (
        <>
          <Image
            source={{ uri: datails?.image }}
            style={styles.image}
          />
          <Text style={{
            fontSize: 22
          }}>{datails?.details.name}</Text>
          <Text></Text>
          <Text>Business Address{datails?.details.address}</Text>
          <Text></Text>
          <Text>Business Owner {datails?.details.contact}</Text>
          <Text></Text>
          <Text>Business Number {datails?.details.contact}</Text>
          <Text></Text>
          <Button title="Update" />
        </>
      ) : (
        <>
          <Text>Loading user details...</Text>
        </>
      )}
      <TouchableOpacity onPress={() => {
        doLogout()
      }}>
        <Text style={{ color: 'red', textAlign: 'right', fontSize: 15, padding: 10 }}>Logout</Text>
      </TouchableOpacity>
      

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default Screen1;