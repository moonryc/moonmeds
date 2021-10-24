import React, {createContext, useState,} from 'react'


export interface IUserContextState {
    loggedIn: boolean,
    setLoggedIn: (state: boolean) => void,
    userId: string,
    setUserId: (state: string) => void,
    usersPeople:string[],
    setUsersPeople:(state:string[])=>void,
}


export const UserContext = createContext<IUserContextState>({
    loggedIn: false,
    setLoggedIn: (state: boolean) => {},
    userId: 'test',
    setUserId: (state: string) => '',
    usersPeople:["placeholder"],
    setUsersPeople:(state:string[])=>{},

})

export const UserContainer = (props: any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('test');
    const [usersPeople, setUsersPeople] = useState<string[]>(["placeholder"]);



    return (
        <UserContext.Provider value={{
            loggedIn,
            setLoggedIn,
            userId,
            setUserId,
            usersPeople,setUsersPeople
        }}>
            {children}
        </UserContext.Provider>
    )
}