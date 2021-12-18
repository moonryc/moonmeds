import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

interface UserContextInterface {
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean | null) => void;
    checkForValidToken: () => void;
}

export const UserContext = createContext<UserContextInterface>({
    isLoggedIn: null,
    setIsLoggedIn: () => {
    },
    checkForValidToken: () => {
    }
})

export const UserContextContainer = (props: any) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    /**
     * first checks if user has a token stored, if the user has a token stored it is
     * then checked to see if the token has not expired
     */
    const checkForValidToken = async () => {

        await SecureStore.getItemAsync("moonmeds-JWT").then(response => {
            console.log(response)
            if (response) {
                fetch("https://moonmeds.herokuapp.com/users/callback",{
                    method: "GET", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        Authorization: response,
                    },
                }).then(callbackResponse=>{
                    if(callbackResponse.ok){
                        setIsLoggedIn(true)
                    }else{
                        setIsLoggedIn(false)
                    }
                })
            } else {
                setIsLoggedIn(false)
            }
        })


    }


    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, checkForValidToken}}>
            {props.children}
        </UserContext.Provider>
    );
};


