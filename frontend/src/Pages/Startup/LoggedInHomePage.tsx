import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import UpcomingRefills from "../../Components/LoggedInHomePageComponets/UpcomingRefills";
import MedicationCard from "../../Components/Misc/MedicationCard/MedicationCard";
import ImportantDates from "../../Components/LoggedInHomePageComponets/Important Dates/ImportantDates";
import HomepageCards from "../../Components/LoggedInHomePageComponets/HomepageCards";


const LoggedInHomePage = () => {
    return (
        <div>
            <AppbarTop/>
            <HomepageCards/>
        </div>
    );
};

export default LoggedInHomePage;
