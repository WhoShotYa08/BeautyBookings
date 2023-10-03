import firebase from "firebase/compat/app";
import "firebase/firestore";
import React from "react";
import { validateCell,  validatePassword, checkEmail, required } from "./signupLogic";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, add, doc, setDoc, query, where, getDoc  } from "firebase/firestore";
import {Alert, ActivityIndicator, View} from "react-native";
import { sendEmail } from "./email";
import { useNavigation } from "@react-navigation/native";

const firebaseConfig = {
  apiKey: "AIzaSyB7rLUJMy_dUnECoDIkFc1mVF6NyLpcm6g",
  authDomain: "bookingsproject-891db.firebaseapp.com",
  projectId: "bookingsproject-891db",
  storageBucket: "bookingsproject-891db.appspot.com",
  messagingSenderId: "116990391385",
  appId: "1:116990391385:web:c5dc56735c4c7f2de16d48"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

var isLoading = false;
const sendData = async (name, surname, email, password, cellNo) => {
  //const navigation = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  let otp = null; 
  dataSent = false
  try {
    const beautyClientsCollectionRef = collection(db, "BeautyClients");
    const q = query(beautyClientsCollectionRef, where("Email", "==", email));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      Alert.alert("User Already Exists", "User already registered. Please log in.", [
        {
          text: "OK",
        },
      ]);
      // navigation.navigate("Login")
    } else {
      // setIsLoading(true)
      isLoading = true;
      
      // User does not exist, create a new document
      otp = Math.floor(1000 * Math.random() * 9999) + 1;
      const newUserDocRef = doc(beautyClientsCollectionRef);

      await setDoc(newUserDocRef, {
        F_Name: name,
        L_Name: surname,
        Email: email,
        Password: password,
        cellNo: cellNo,
        OTP: otp,
      });

      console.log('Data sent to Firestore successfully');
      console.log(dataSent)
      sendEmail(email, otp, name);
      // setIsLoading(false);
      isLoading = false;
      
    }
  } catch (error) {
    console.error('Error sending data to Firestore:', error);
    return false;
  }

  return dataSent;
};


export const handleSignUp = async (name, surname, email, password, cellNo, confirmPassword) => {
  //handleLoading(isLoading);
  const isRequired = required(name, surname, email, password, cellNo,)
  const isPasswordValid = validatePassword(password, confirmPassword);
  const isEmailValid = checkEmail(email);
  const isCellValid = validateCell(cellNo);


  let dataSent = false;
  dataSent = await sendData(name, surname, email, password, cellNo, collection);
  //dataSent = await sendData(name, surname, email, password, cellNo, collection);
  console.log(isLoading);

  if (isPasswordValid && isEmailValid && isCellValid && dataSent ) {
    await sendData(name, surname, email, password, cellNo, collection);
  }
};

const Loading = () => {
  return <ActivityIndicator size="large" color="purple"/>
}

const handleLoading = (isLoading) => {
  isLoading && <View> <Loading /> </View>
}

module.export = db;