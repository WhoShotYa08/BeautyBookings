import { async } from "@firebase/util";
import { db } from "../db/firebase_";
import { FirestoreError, doc, getDoc, setDoc } from "firebase/firestore";


const addUser = async (id, data = { name: '', surname: '', cellNo: '', email: '', password: ''  }) => {
    try {
        let userData
        await setDoc(doc(db, "users", id), data).then(async () => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                userData = docSnap.data();
            } else {
                throw new FirestoreError();
            }
        })
        return userData;
    } catch (error) {
        return error
    }
}

const getUser = async (id) => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new FirestoreError();
        }

    } catch (error) {
        return error
    }
}

export { addUser, getUser }