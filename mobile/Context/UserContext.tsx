import React, {createContext, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {Text, View} from 'react-native';

interface UserContextInterface {
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean | null) => void;
    checkUserCredentials: ()=> void;
}

export const UserContext = createContext<UserContextInterface>({
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    checkUserCredentials: () => {}
})

export const UserContextContainer = (props: any) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    const checkUserCredentials = () => {
        const response = async () => {
            await SecureStore.getItemAsync("moonmeds-JWT").then(r => {
                console.log(r)
                if (r) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(true)
                }
            })


        }
        response().then()
    }


    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn,checkUserCredentials}}>
            {props.children}
        </UserContext.Provider>
    );
};


