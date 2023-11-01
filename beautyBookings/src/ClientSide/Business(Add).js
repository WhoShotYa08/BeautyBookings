import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { updateBusinessDetails } from '../components/db/firebase_'; // You'll need to implement this function

const Screen2 = ({ route, navigation }) => {
  // const { userDetails } = route.params; // Pass user details from Screen1

  // const [businessName, setBusinessName] = useState(userDetails.BusinessName);
  // const [address, setAddress] = useState(userDetails.Address);
  // const [ownerName, setOwnerName] = useState(userDetails.OwnerName);
  // const [cellphoneNumber, setCellphoneNumber] = useState(userDetails.cellphoneNumber);
  // const [imageURL, setImageURL] = useState(userDetails.image);

  // const handleUpdate = async () => {
  //   const updatedDetails = {
  //     BusinessName: businessName,
  //     Address: address,
  //     OwnerName: ownerName,
  //     cellphoneNumber: cellphoneNumber,
  //     image: imageURL,
  //   };

  //   await updateBusinessDetails(userDetails.uid, updatedDetails);
  //   navigation.navigate('Screen1');
  // };

  return(
    <View>
      <Text>Business Add Screen 2</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <Text>Image on top</Text>
      <Image source={{ uri: imageURL }} style={styles.image} />

      <Text>Business Name</Text>
      <TextInput
        value={businessName}
        onChangeText={(text) => setBusinessName(text)}
      />

      <Text>Address</Text>
      <TextInput value={address} onChangeText={(text) => setAddress(text)} />

      <Text>Owner Name</Text>
      <TextInput value={ownerName} onChangeText={(text) => setOwnerName(text)} />

      <Text>Cellphone Number</Text>
      <TextInput
        value={cellphoneNumber}
        onChangeText={(text) => setCellphoneNumber(text)}
      />

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default Screen2;