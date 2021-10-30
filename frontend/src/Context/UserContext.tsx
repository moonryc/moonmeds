import React, {createContext, useState,} from 'react'
import {IPersonNameAndColor} from "../../../Types/UserTypes";


export interface IUserContextState {
    loggedIn: boolean|null,
    setLoggedIn: (state: boolean|null) => void,


    usersPeople:IPersonNameAndColor[],
    setUsersPeople:(state:IPersonNameAndColor[])=>void,
}


export const UserContext = createContext<IUserContextState>({
    loggedIn: null,
    setLoggedIn: (state: boolean|null) => {},


    usersPeople:[{name:"Default",color:"Grey"}],
    setUsersPeople:(state:IPersonNameAndColor[])=>null,

})

export const UserContainer = (props: any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean|null>(null);

    const [usersPeople, setUsersPeople] = useState<IPersonNameAndColor[]>([{name:"Default",color:"Grey"}]);



    return (
        <UserContext.Provider value={{
            loggedIn,
            setLoggedIn,
            usersPeople,
            setUsersPeople
        }}>
            {children}
        </UserContext.Provider>
    )
}