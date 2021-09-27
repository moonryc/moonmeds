import React,{createContext, useState,} from 'react'

interface UserContextState{
    loggedIn:boolean,
    setLoggedIn:(state:boolean) => void,
    userId:string,
    setUserId:(state:string) => void,

}

export const UserContext = createContext<UserContextState>({
    loggedIn:false,
    setLoggedIn:(state:boolean)=>{},
    userId:'test',
    setUserId:(state:string) => ''
})

export const UserContainer= (props:any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('test');

    //@ts-ignore TODO fix this tsignore
    return (
        <UserContext.Provider value = {{loggedIn, setLoggedIn, userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}