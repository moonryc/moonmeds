import React from 'react'
import * as SecureStore from 'expo-secure-store';


export const confirmCredentials = async () => {

    let url = "/users/callback";

    // Default options are marked with *
    return await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // @ts-ignore
        headers: {
            Authorization: SecureStore.getItemAsync("moonmeds-JWT"),
        },
    })

}


export const submitLogin = async (userName: string, password: string) => {

    let url = "/users/login";

    // Default options are marked with *
    return await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELsETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({userName: userName, password: password}), // body data type must match "Content-Type" header
    }).then((response) => {
        if (response.ok) {
            response.json()
                .then((data) => {
                    SecureStore.setItemAsync("moonmeds-JWT",data)
                })
        } else {
            //TODO
        }
    })
}

export const submitSignup = async (userName: string, password: string, email: string) => {
    let url = "/users/register";
    // Default options are marked with *
    await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            password: password,
            emailAddress: email,
        }), // body data type must match "Content-Type" header
    })

}