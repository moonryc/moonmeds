import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Login from "./Pages/Startup/Login";
import Signup from "./Pages/Startup/Signup";
import Homepage from "./Pages/Startup/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import {Route, Switch} from "react-router-dom";
import LoggedInHomePage from "./Pages/Startup/LoggedInHomePage";
import Loading from "./Pages/Misc/Loading";
import UserContext from "./Context/UserContext";


function App() {

    const [auth, setAuth] = useState(); //if we change this value we get different pages

    //region FETCH
    const checkIfLoggedIn = async ()=>{
        let url='/auth/current-session';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                if(data){
                    console.log(data);
                    setAuth(data);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }
    //endregion

    //todo use effect is running all the time once loggged in and that needs to change
    useEffect(()=> {
        checkIfLoggedIn();
    },[])


    if(auth){
        //TODO FIX THIS TS-IGNORE
        // @ts-ignore
        return <LoggedInHomePage auth={auth}/>
    }else{
        //TODO FIX THIS TS-IGNORE
        // @ts-ignore
        return <Homepage auth={false}/>
    }

}

export default App;
