import React, { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, Button } from 'react-native';
import { getUserDetails } from "../components/db/firebase_";

const Screen1 = ({route}) =>{
    const { uid } = route.params;
    const [businessdetails, setbusinessdetails] = useState(null);
    useEffect(() => {
        const fetchUserDetails = async() =>{
            const data = await getUserDetails(uid);
            setbusinessdetails(data);
        };
        fetchUserDetails();
    }, [uid]);

     return(
      <View style={styles.container}>
      {userDetails ? (
        <>
        <Text>Business image</Text>
          <Image
            source={{ uri: userDetails.image }} 
            style={styles.image}
          />
          <Text>Business Name {userDetails.BusinessName}</Text>
          <Text>Business Address{userDetails.Address}</Text>
          <Text>Business Owner {userDetails.OwnerName}</Text>
          <Text>Business Number {userDetails.cellphonenumber}</Text>
          <Text>Business Email {userDetails.Email}</Text>
          <Button>Update</Button>
        </>
      ) : (
        <Text>Loading user details...</Text>
      )}
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