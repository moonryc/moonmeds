import React from 'react';
import LogoutButton from "../../Components/Misc/LogoutButton";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import UpcomingRefills from "../../Components/LoggedInHomePageComponets/UpcomingRefills";
import MedicationCard from "../../Components/Misc/MedicationCard/MedicationCard";
import ImportantDates from "../../Components/LoggedInHomePageComponets/Important Dates/ImportantDates";
import HomepageCards from "../../Components/LoggedInHomePageComponets/HomepageCards";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    wrapper: {
        background: theme.palette.primary.main,
        color: theme.palette.text.primary,
        height: '100vmin'
    },
    cardHolder:{
        paddingTop: '30vh',
        background: theme.palette.primary.dark
    }
}));

const LoggedInHomePage = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <AppbarTop />
            <HomepageCards className={classes.cardHolder}/>
        </div>
    );
};

export default LoggedInHomePage;
