import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


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
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});