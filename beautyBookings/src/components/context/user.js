import { auth } from "../db/firebase_";
import { Children, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext()

const UserContextWrapper = ({children}) => {
    const [user, setUser] = useState(null);
    const [hairstyles, setHairstyles] = useState([])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }else{
                setUser(null);
            }
        });
    }, [])

    return <UserContext.Provider value={{ user, setUser, hairstyles, setHairstyles}}>{children}</UserContext.Provider>;
}

export default UserContextWrapper