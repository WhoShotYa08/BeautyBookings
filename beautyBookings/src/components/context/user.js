import { auth } from "../db/firebase_";
import { Children, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { collection, doc, query, where} from "firebase/firestore";
// import { useNavigation } from "@react-navigation/native";

export const UserContext = createContext()

const UserContextWrapper = ({children}) => {
    // const navigation = useNavigation();
    const [user, setUser] = useState(null);
    // const [notVerified, setNotVerified] = useState(false);

    //getting data to check whether user is verified or not 
    // const userRef = collection(db, "users");
    // const q = query(userRef, where("verified", "==", false));
    // const querySnap  = await getDoc(q);

    // querySnap.forEach( (doc)=> {
    //     if(doc.id == user){
    //         //navigate to otp page
    //         navigation.navigate("OTP");
    //         //this might not work
    //     }
    // } )


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }else{
                setUser(null);
            }
        });
    }, [])

    return <UserContext.Provider value={{ user, setUser}}>{children}</UserContext.Provider>;
}

export default UserContextWrapper