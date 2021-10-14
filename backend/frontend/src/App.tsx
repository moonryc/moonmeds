import React, {useContext, useEffect} from 'react';
import './App.css';
import Homepage from "./Pages/Startup/Homepage";
import LoggedInHomePage from "./Pages/Startup/LoggedInHomePage";
import {UserContext} from "./Context/UserContext";
import CalendarOverViewPage from "./Pages/CalenderOverviewPage";
import ErrorPage from "./Pages/ErrorPage";
import {Route} from "react-router-dom";
import UserAccountPage from "./Pages/UserAccountPage";
import NotificationsParent from "./Components/Misc/Notifications/NotificationsParent";
import {ApiContext} from "./Context/ApiContext";


function App() {

    const { loggedIn} = useContext<any>(UserContext);
    const { checkIfLoggedIn} = useContext<any>(ApiContext);

    /**
     * Travis so help me god if you remove the [] on this useEffect
     * for real though the empty array is needed because this makes it only render on the initial webpage load
     * otheriwse it will run over and over and over causeing issues
     */
    useEffect(()=> {
        checkIfLoggedIn();
    },[])
    //Travis see comment above

    return (
    <div >
        <Route exact path="/" component={loggedIn? LoggedInHomePage : Homepage} />
        <Route exact path="/CalendarOverview" component={loggedIn? CalendarOverViewPage: Homepage} />
        <Route exact path="/Err" component={ErrorPage} />
        <Route exact path="/MedicationPage" component={loggedIn? LoggedInHomePage : Homepage} />
        <Route exact path="/UserAccount" component={loggedIn? UserAccountPage: Homepage } />
        <NotificationsParent/>
    </div>

    )


}

export default App;
