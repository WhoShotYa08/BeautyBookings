import { auth } from "../db/firebase_";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const doLogIn = async (email = '', password = '') => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
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
        await signOut(auth);
        return
    } catch (error) {
        return error
    }
}


export { doLogIn, doSignUp, doLogout }