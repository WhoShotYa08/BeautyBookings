import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc, updateDoc } from "firebase/firestore"


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
export const auth = getAuth(app);



export const loginWithCredentials = async (pass, pin ) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, pass, pin);
        return userCredential.user;
    } catch (error){
        return error;
    }
};

export const getUserDetails = async(uid) => {
    const userDocRef = doc(db, "Business Side", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
        return userDocSnapshot.data();
    } else {
        return null
    }
}
export const updateBusinessDetails = async (uid, updatedDetails) => {
    const businessRef = doc(db, 'Business Side', uid);
  
    try {
      await updateDoc(businessRef, updatedDetails);
      console.log('Document successfully updated');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };