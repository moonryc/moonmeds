import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import BackDrop from "../../Components/HomepageComponents/BackDrop";
import LoginButton from "../../Components/Misc/LoginButton";
import {makeStyles} from "@material-ui/core";
const useStyles = makeStyles((theme?: any) => ({
    wrapper:{
        height: '100vh',
        display:'flex',
        flexDirection: 'column'
    }
}));

//This Page is displayed at '/'
//TODO fix props any
const Homepage = (props:any) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <UserContext.Provider value={props.auth}>
                <AppbarTop/>
                <BackDrop/>
            </UserContext.Provider>
        </div>
    )
};

export default Homepage;
