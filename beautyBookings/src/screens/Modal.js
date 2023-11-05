import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import CardDetails from "./cardDetails";


function ModalTester({ navigation, route }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const { busId } = route.params;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  return (
    <View style={{ flex: 1 }}>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <CardDetails busId={busId}/>

          <Button title="Cancel" onPress={() => navigation.navigate("Book Appointment", {busId})} />
          
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;