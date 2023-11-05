import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Image, Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { doc, Timestamp, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../components/db/firebase_";
import { UserContext } from "../components/context/user";
import Btn from "../components/Btn";


const Appointment = ({ route, navigation }) => {
  const { busId } = route.params;
  const defaultDate = new Date();
  const [dates, setDate] = useState(defaultDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const user = useContext(UserContext);
  const uid = user["user"].uid;
  const userEmail = user["user"].email;
  const [info, setInfo] = useState(false);
  const [client, setClient] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };


  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    hideTimePicker();
    ToastAndroid.showWithGravity(
      "Please confirm your details",
      ToastAndroid.LONG,
      ToastAndroid.TOP
    )
  };

  const toggleDatePicker = () => {
    showDatePicker();
  };

  const getData = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setClient(docSnap.data());
    } else {
      ToastAndroid.showWithGravity( 
        "Cannot Retrieve you information, please try again later",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      )
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const AddData = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);


      userName = docSnap.data().name;
      userLastName = docSnap.data().surname;
      userCell = docSnap.data().cellNo;
      const deadlineTimestamp = Timestamp.fromMillis(dates.getTime());
      await addDoc(collection(db, "Appointments"), {
        email: userEmail,
        cell: userCell,
        date_: deadlineTimestamp,
        name: userName,
        surname: userLastName,
        businessId: busId.toString(),
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
    <View style={{ backgroundColor: "lightgrey", height: "100%" }}>
      <Image
        src="https://th.bing.com/th/id/OIG.6H8SBR.XDOQKakYm9tld?pid=ImgGn"
        style={{ height: "40%", width: "100%" }}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={[ { marginLeft: 20, borderBottomColor: "grey", bottomBottomWidth: 0 }, styles.input]}
          onPress={toggleDatePicker}
        >
          <View>
            <Text style={styles.textColor}>{dates.toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <View style={{justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
          <Text style={styles.textColor}>{client.name}</Text>
          <Text style={styles.textColor}>{client.surname}</Text>
          <Text style={styles.textColor}>{client.cellNo}</Text>
          <Text style={styles.textColor}>{client.email}</Text>
          <Text style={styles.textColor}>{dates.toLocaleDateString()}</Text>
          <Text style={styles.textColor}>{dates.toLocaleTimeString()}</Text>
        </View>
        <View style={styles.book}>
          <Btn text={"Book Appointment"} func={() => navigation.navigate("Modal", {busId})} />
          {/* <Btn text={"Book Appointment"} func={handleSubmit} /> */}
        </View>
      </View>

    </View>
  );
};

export default Appointment;

export const styles = StyleSheet.create({
  submit: {
    backgroundColor: "#",
    width: 300,
    height: 35,
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 4,
  },
  textColor: {
    color: "black",
    textAlign: "center",
    marginVertical: 4,
    fontSize: 16,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    width: "60%",

  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "#E5E4E2",
    marginVertical: 50,
    padding: 5,
    width: "65%",
    alignSelf: "center",
  },
  desc: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    fontWeight: "400",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "99%",
    alignSelf: "center",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    zIndex: 1,
    position: "relative",
    bottom: 25,
  },
  book: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    top: 30
  }
});
