import { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({children}) =>{
    const [showpostmodel , setshowpostmodel] = useState(false);
    const [showeditpostmodel , setshoweditpostmodel] = useState(false);
    const [editpostdata, seteditpostdata] = useState(null); // 🔴 Yeh add karo

    return <AppContext.Provider value={{
        showpostmodel, 
        setshowpostmodel, 
        showeditpostmodel, 
        setshoweditpostmodel,
        editpostdata,
        seteditpostdata
        }}>
        {children}
    </AppContext.Provider>
}

export const useGloble =()=>{
    return useContext(AppContext);
}

export  default AppProvider;