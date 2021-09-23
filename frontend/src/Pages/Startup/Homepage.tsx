import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import BackDrop from "../../Components/HomepageComponents/BackDrop";
import LoginButton from "../../Components/Misc/LoginButton";
import UserContext from "../../Context/UserContext";


//This Page is displayed at '/'
//TODO fix TS-ignore
const Homepage = (props:any) => {
    return (
        <div>
            <UserContext.Provider value={props.auth}>
                <AppbarTop/>
                <BackDrop/>
            </UserContext.Provider>
        </div>
    )
};

export default Homepage;
