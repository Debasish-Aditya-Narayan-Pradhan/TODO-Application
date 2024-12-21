import React, { useState }  from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>
{
    const[connected,setConnected] = useState(false)
    const [userId,setUserId] = useState(0)
    return (
        <UserContext.Provider value={{userId,setUserId,connected,setConnected}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider