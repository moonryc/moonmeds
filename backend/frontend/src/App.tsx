import React, {useContext, useEffect} from 'react';
import './App.css';
import Homepage from "./Pages/Startup/Homepage";
import LoggedInHomePage from "./Pages/Startup/LoggedInHomePage";
import {UserContext} from "./Components/Misc/UserContext";
import CalendarOverViewPage from "./Pages/CalenderOverviewPage";
import ErrorPage from "./Pages/ErrorPage";
import MedicationPage from "./Pages/MedicationPage";
import {Route} from "react-router-dom";
import SendToLogin from "./Components/Misc/SendToLogin";
import {ILoginResponse} from "../../Types/BackendResponseType";



function App() {

    const { setUserId, loggedIn, setLoggedIn } = useContext<any>(UserContext);

    //region FETCH
    const checkIfLoggedIn = async ()=>{
        let backendResponse:ILoginResponse = {isLoggedIn: false, jwtToken: ""}
        let url='/auth/current-session';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                backendResponse = data
                setLoggedIn(backendResponse.isLoggedIn)
                setUserId(backendResponse.jwtToken)
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

    const sendToLogin = async () => {
        let url = '/auth/login'
        fetch(url,{method:('GET')})
            .then(response=>response.json)
            .then(data=>data)
    }

    return (
    <>
        <Route exact path="/" component={loggedIn? LoggedInHomePage : Homepage} />
        <Route exact path="/CalendarOverview" component={loggedIn? CalendarOverViewPage: CalendarOverViewPage} />
        <Route exact path="/Err" component={ErrorPage} />
        <Route exact path="/MedicationPage" component={loggedIn? LoggedInHomePage : Homepage} />
    </>

    )


}

export default App;
