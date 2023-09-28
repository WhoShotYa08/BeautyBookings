import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import { styles } from "./styles";
import {validateCell, validatePassword, checkEmail} from "./signupLogic";
import { getFirestore, addDoc, collection, getDocs, add, doc, setDoc  } from "firebase/firestore";
import {sendData} from "./db/firestore";
import { useNavigation } from '@react-navigation/native';

//NB Check the dataSent declared in ./db/firestore variable to fix the nav issues
//NB Check the dataSent declared in ./db/firestore variable to fix the nav issues
//NB Check the dataSent declared in ./db/firestore variable to fix the nav issues

export default function BeautySignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [gender, setGender] = useState("");
  const [loading, isLoading] = useState(false);
  
  
  const handleSignUp = async () => {
    Keyboard.dismiss();
    isLoading(true);
    loading && <ActivityIndicator size={"large"} color={"purple"}/>
    const isPasswordValid = validatePassword(password, confirmPassword);
    const isEmailValid = checkEmail(email);
    const isCellValid = validateCell(cellNo);

    //getting dataSent stored in sendData function in ./db/firestore.js
    let dataSent = false;
    dataSent = await sendData(name, surname, email, password, cellNo, gender, collection);
    console.log(dataSent);

    if (isPasswordValid && isEmailValid && isCellValid && dataSent == true) {
      sendData(name, surname, email, password, cellNo, gender, collection);
      navigation.navigate("OTP", {otp});
      isLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
    <View style={styles.formView}>
      
        {/* <TouchableWithoutFeedback> */}
          <Text>First Name</Text>
          <TextInput
            placeholder="e.g John"
            style={styles.input}
            keyboardType="default"
            inputMode="text"
            onChangeText={(clientName) => setName(clientName)}
            cursorColor={"blue"}
          />
          <Text>Last Name</Text>
          <TextInput
            placeholder="e.g Doe"
            style={styles.input}
            keyboardType="default"
            inputMode="text"
            onChangeText={(clientSurame) => setSurname(clientSurame)}
            cursorColor={"blue"}
          />
          <Text>Gender</Text>
          <TextInput
            placeholder="e.g M/F"
            style={styles.input}
            keyboardType="default"
            inputMode="text"
            onChangeText={(clientGender) => setGender(clientGender)}
            cursorColor={"blue"}
          />
          <Text>Email</Text>
          <TextInput
            placeholder="e.g user1@gmail.com"
            style={styles.input}
            keyboardType="email-address"
            inputMode="email"
            onChangeText={(emailText) => setEmail(emailText)}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="e.g Mypassword@01"
            secureTextEntry
            style={styles.input}
            textContentType="newPassword"
            onChangeText={(passwordText) => setPassword(passwordText)}
          />
          <Text>Confirm Password</Text>
          <TextInput
            placeholder="e.g Mypassword@01"
            secureTextEntry
            style={styles.input}
            textContentType="newPassword"
            onChangeText={(confirmPasswordText) => setConfirmPassword(confirmPasswordText)}
          />
          <Text>Cell No.</Text>
          <TextInput
            placeholder="e.g 0123456789"
            style={styles.input}
            onChangeText={(cellNoText) => setCellNo(cellNoText)}
          />
          <TouchableOpacity onPress={handleSignUp}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        {/* </TouchableWithoutFeedback> */}
      
    </View>
    </KeyboardAvoidingView>
  );
}