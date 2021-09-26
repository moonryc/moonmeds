import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import {UserContext} from "../../Components/Misc/UserContext"
import MissedMedication from "../../Components/LoggedInHomePageComponets/MissedMedication";
import UpcomingRefills from "../../Components/LoggedInHomePageComponets/UpcomingRefills";
import MedicationCard from "../../Components/Misc/MedicationCard";

const LoggedInHomePage = () => {
    return (
        <div>
                <AppbarTop/>
                <MissedMedication/>
                <UpcomingRefills/>
                <LogoutButton/>
                <MedicationCard/>
        </div>
    );
};

export default LoggedInHomePage;
