import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyB8bgu81eKcc44SruD1-x1sHRQArB2Wpho",
    authDomain: "beautybookings-c6bbe.firebaseapp.com",
    projectId: "beautybookings-c6bbe",
    storageBucket: "beautybookings-c6bbe.appspot.com",
    messagingSenderId: "266514003027",
    appId: "1:266514003027:web:35c86e152721cb9a9b42a6",
    measurementId: "G-QX4S7RZX9L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);