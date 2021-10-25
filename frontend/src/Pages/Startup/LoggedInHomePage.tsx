import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import HomepageCards from "../../Components/LoggedInHomePageComponets/Cards/HomepageCards";
import {makeStyles} from "@mui/styles";
import {backgroundStyle, wrapperStyle} from "../../Styles";
import {Box} from "@mui/material";


const LoggedInHomePage = () => {

    return (
        <Box sx={{...wrapperStyle, ...backgroundStyle}}>
            <AppbarTop />
            <Box sx={{p:'5vh'}}>
                <HomepageCards />
            </Box>
        </Box>
    );
};

export default LoggedInHomePage;
