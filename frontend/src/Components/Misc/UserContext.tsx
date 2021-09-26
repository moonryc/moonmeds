import React,{createContext, useState,} from 'react'

interface UserContextState{
    loggedIn:boolean,
    setLoggedIn:(state:boolean) => void,
    user:string,
    setUser:(state:string) => void

}

export const UserContext = createContext<UserContextState>({
    loggedIn:false,
    setLoggedIn:(state:boolean)=>{},
    user:'test',
    setUser:(state:string) => ''
})

export const UserContainer= (props:any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<string>('test');

    //@ts-ignore TODO fix this tsignore
    return (
        <UserContext.Provider value = {{loggedIn, setLoggedIn, user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}