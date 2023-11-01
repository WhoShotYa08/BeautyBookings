
import { createContext, useEffect, useState } from "react";

export const HeaderContext = createContext()

const HeaderContextWrapper = ({ children }) => {
    const [name, setName] = useState(null);
   
    return <HeaderContext.Provider value={{ name, setName }}>{children}</HeaderContext.Provider>;
}

export default HeaderContextWrapper