import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import UserContext from "../../Context/UserContext";

const LoggedInHomePage = () => {
    return (
        <div>
            <UserContext.Provider value={null}>
                <AppbarTop/>
                <LogoutButton/>
            </UserContext.Provider>
        </div>
    );
};

export default LoggedInHomePage;
