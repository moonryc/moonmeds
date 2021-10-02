import React,{createContext, useState,} from 'react'

interface IUserContextState{
    loggedIn:boolean,
    setLoggedIn:(state:boolean) => void,
    userId:string,
    setUserId:(state:string) => void,
    selectedDay:Date,
    setSelectedDay:(state:Date)=>void

}

export const UserContext = createContext<IUserContextState>({
    loggedIn:false,
    setLoggedIn:(state:boolean)=>{},
    userId:'test',
    setUserId:(state:string) => '',
    selectedDay:new Date(),
    setSelectedDay:(state:Date)=>{},
})

export const UserContainer= (props:any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('test');
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    return (
        <UserContext.Provider value = {{loggedIn, setLoggedIn, userId, setUserId, selectedDay,setSelectedDay}}>
            {children}
        </UserContext.Provider>
    )
}