import { auth, db } from "../db/firebase_";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import HeaderContextWrapper from "./header";
// Import package from node modules



export const UserContext = createContext()

const UserContextWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const hairstyles = {}

    useEffect(() => {
        onAuthStateChanged(auth, async (user_) => {
            /// console.log(user_);
            if (user_) {
                try {
                    const docRef = doc(db, "users", user_.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // user
                        setUser({ ...user_, userType: true })
                    } else {
                        // busines
                        setUser({ ...user_, userType: false })
                    }
                } catch (error) {
                    setUser(null)
                }
            } else {
                setUser(null);
            }
        });
    }, [])

    return <UserContext.Provider value={{ user, setUser, hairstyles}}><HeaderContextWrapper>{children}</HeaderContextWrapper></UserContext.Provider>;
}

export default UserContextWrapper