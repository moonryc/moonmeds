import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import UpcomingRefills from "../../Components/LoggedInHomePageComponets/UpcomingRefills";
import MedicationCard from "../../Components/Misc/MedicationCard/MedicationCard";
import MissedMedication from "../../Components/LoggedInHomePageComponets/MissedMedications/MissedMedication";


const LoggedInHomePage = () => {
    return (
        <div>
            <AppbarTop/>
            <MissedMedication/>
            {/*<UpcomingRefills/>*/}
            <MedicationCard/>
        </div>
    );
};

export default LoggedInHomePage;
