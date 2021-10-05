import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import BackDrop from "../../Components/HomepageComponents/BackDrop";
import {makeStyles} from "@mui/styles";
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
                <AppbarTop/>
                <BackDrop/>
        </div>
    )
};

export default Homepage;
