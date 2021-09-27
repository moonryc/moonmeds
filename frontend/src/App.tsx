import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Homepage from "./Pages/Startup/Homepage";
import LoggedInHomePage from "./Pages/Startup/LoggedInHomePage";
import {UserContext} from "./Components/Misc/UserContext";

function App() {

    const { setUserId, loggedIn, setLoggedIn } = useContext<any>(UserContext);

    //region FETCH
    const checkIfLoggedIn = async ()=>{
        let url='/auth/current-session';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data){
                    setLoggedIn(true)
                    setUserId(data)
                        console.log("User data below: ");
                }else{
                    setUserId()
                    setLoggedIn(false)
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }
    //endregion

    useEffect(()=> {
        checkIfLoggedIn();
    },[])


    if(loggedIn){
        return <LoggedInHomePage/>
    }else{
        return <Homepage/>
    }

}

export default App;
