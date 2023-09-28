import firebase from "firebase/compat/app";
import "firebase/firestore";
import React, {useState} from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, add, doc, setDoc, query, where, getDoc  } from "firebase/firestore";
import {Alert, ActivityIndicator} from "react-native";
import { sendEmail } from "./email";

const firebaseConfig = {
    apiKey: "AIzaSyB8bgu81eKcc44SruD1-x1sHRQArB2Wpho",
    authDomain: "beautybookings-c6bbe.firebaseapp.com",
    projectId: "beautybookings-c6bbe",
    storageBucket: "beautybookings-c6bbe.appspot.com",
    messagingSenderId: "266514003027",
    appId: "1:266514003027:web:35c86e152721cb9a9b42a6",
    measurementId: "G-QX4S7RZX9L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const sendData = async (name, surname, email, password, cellNo, gender) => {
  
  let dataSent = false;
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
    } else {
      // User does not exist, create a new document
      const otp = Math.floor(1000 * Math.random() * 9999) + 1;
      const newUserDocRef = doc(beautyClientsCollectionRef);

      await setDoc(newUserDocRef, {
        F_Name: name,
        L_Name: surname,
        Email: email,
        Password: password,
        cellNo: cellNo,
        Gender: gender,
        OTP: otp,
      });

      console.log('Data sent to Firestore successfully');
      dataSent = true;
      sendEmail(email, otp, name);
    }

    return otp;
  } catch (error) {
    return false
    console.error('Error sending data to Firestore:', error);
  }
};

module.export = db;

//rafce