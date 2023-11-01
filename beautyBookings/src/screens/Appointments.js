import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";


const Appointment = () => {
  const defaultDate = new Date();
  // const defaultTime = new Date().toLocaleTimeString();
  const [dates, setDate] = useState(defaultDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const user = useContext(UserContext);
  const uid = user["user"].uid;
  const userEmail = user["user"].email;
  
  //date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  //time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  //hide date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //hide time picker
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    hideTimePicker();
  };

  const toggleDatePicker = () => {
    showDatePicker();
  };

  const AddData = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      
      userName = docSnap.data().name;
      userLastName = docSnap.data().surname;
      userCell = docSnap.data().cellNo;
      const deadlineTimestamp = Timestamp.fromMillis(dates.getTime());

      await setDoc(doc(db, "Appointments", uid), {
        email: userEmail,
        cell: userCell,
        date_: deadlineTimestamp,
        name: userName,
        surname: userLastName,
      });
      ToastAndroid.showWithGravity(
        "Appointment Successful",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      )
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSubmit = () => {
    AddData();
  }

  return (
    <View>
      <Text style={styles.header}>Create a task</Text>
      <View style={styles.desc}>
        <TouchableOpacity
          style={[styles.input, { marginLeft: 20 }]}
          onPress={toggleDatePicker}
        >
          <View>
            <Text>{dates.toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <View>
          <Text style={styles.textColor}>Book Appointment</Text>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </View>
  );
};

export default Appointment;

export const styles = StyleSheet.create({
  submit: {
    backgroundColor: "#007FFF",
    width: 300,
    height: 35,
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 4,
  },
  textColor: {
    color: "white",
    textAlign: "center",
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "#E5E4E2",
    marginVertical: 10,
    padding: 5,
  },
  desc: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    fontWeight: "400",
  },
});
