import React, {createContext, useState,} from 'react'


export interface IUserContextState {
    loggedIn: boolean|null,
    setLoggedIn: (state: boolean|null) => void,


    usersPeople:string[],
    setUsersPeople:(state:string[])=>void,
}


export const UserContext = createContext<IUserContextState>({
    loggedIn: null,
    setLoggedIn: (state: boolean|null) => {},


    usersPeople:["placeholder"],
    setUsersPeople:(state:string[])=>{},

})

export const UserContainer = (props: any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean|null>(null);

    const [usersPeople, setUsersPeople] = useState<string[]>(["placeholder"]);



    return (
        <UserContext.Provider value={{
            loggedIn,
            setLoggedIn,
            usersPeople,setUsersPeople
        }}>
            {children}
        </UserContext.Provider>
    )
}