import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import UserContext from "../../Context/UserContext";
import MissedMedication from "../../Components/LoggedInHomePageComponets/MissedMedication";
import UpcomingRefills from "../../Components/LoggedInHomePageComponets/UpcomingRefills";
import MedicationCard from "../../Components/Misc/MedicationCard/MedicationCard";


const LoggedInHomePage = () => {
    return (
        <div>
            <UserContext.Provider value={null}>
                <AppbarTop/>
                <MissedMedication/>
                <UpcomingRefills/>
                <LogoutButton/>
                <MedicationCard/>


            </UserContext.Provider>
        </div>
    );
};

export default LoggedInHomePage;
