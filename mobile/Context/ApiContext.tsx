import React, {createContext, useContext} from 'react';
import {response} from "express";
import * as SecureStore from 'expo-secure-store';
import {UserContext} from "./UserContext";

interface IApiContext {
    postLogin: (username: string, password: string ) => void
}


export const ApiContext = createContext<IApiContext>({
    postLogin: (username: string, password: string ) => {
    }
});

const ApiContextContainer = (props: any) => {

    const {setIsLoggedIn} = useContext(UserContext);

    const postLogin = async (username: string, password: string ) => {

        const url = "https://moonmeds.herokuapp.com/users/login"


        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELsETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({userName:username, password: password}), // body data type must match "Content-Type" header
        }).then(response=>{
            if(response.ok){
                response.json().then(data=>{
                    console.log(data)
                    SecureStore.setItemAsync("moonmeds-JWT", data.payload.token)
                    setIsLoggedIn(true)
                })
            }else{
                setIsLoggedIn(false)
            }
        })
    }


    return (
        <ApiContext.Provider value={{postLogin}}>
            {props.children}
        </ApiContext.Provider>
    );
};

export default ApiContextContainer;
