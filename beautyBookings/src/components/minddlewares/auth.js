import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../db/firebase_";

const doLogIn = async (email = '', password = '') => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        return error
    }
}


const doSignUp = async (email = '', password = '') => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        return error
    }
}


const doLogout = async () => {
    try {
        return await signOut(auth);
    } catch (error) {
        return error
    }
}

export { doLogIn, doSignUp, doLogout }