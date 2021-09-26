import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Homepage from "./Pages/Startup/Homepage";
import LoggedInHomePage from "./Pages/Startup/LoggedInHomePage";
import {UserContext} from "./Components/Misc/UserContext";

function App() {

    //if we change this value we get different pages
    const [auth, setAuth] = useState();


    const user = useContext<any>(UserContext);
    const { userId, setUserId } = user;
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
                    setAuth(data);
                    setUserId(data.userId)
                        console.log("User data below: ");
                        console.log(data);
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
