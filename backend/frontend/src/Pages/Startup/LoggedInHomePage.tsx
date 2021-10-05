import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import HomepageCards from "../../Components/LoggedInHomePageComponets/Cards/HomepageCards";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    wrapper: {
        background: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        height: '100vh',
    },
    cardHolder:{
        padding: '5vh',
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
