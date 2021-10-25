import React, {useContext, useState} from 'react';
import {Button} from "@mui/material";
import {UserContext} from "../../Context/UserContext";

const TestPrivateRoute = () => {

    const user = useContext(UserContext);
    const {userId} = user

    const checkIfLoggedIn = async ()=>{
        let url='/medication/getmedications';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(userId) // body data type must match "Content-Type" header
        });
        console.log(response)
        console.log(userId)
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const [state, setState] = useState<any>("initState");

    const privateRoute = async() => {
        let url='/medication';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => console.log(response))
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }
    
    return (
        <div>
            <Button onClick={()=>checkIfLoggedIn()}>privateRoute </Button>
        </div>
    );
};

export default TestPrivateRoute;
