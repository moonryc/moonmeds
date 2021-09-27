import React, {useContext, useEffect, useState} from 'react';
import {AppBar, Box, Button, Container, makeStyles, Toolbar, Typography} from "@material-ui/core";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../Misc/UserContext";
import TestPrivateRoute from "../Misc/TestPrivateRoute";
import {Login} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        background: theme.palette.primary.main,
        color: theme.palette.text.primary
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: 0
    },
    appBar:{
        flex: 0
    }
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();

    let {loggedIn:loggedIn} = useContext(UserContext);


    return(
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Moons Meds {'>'}:)
                    </Typography>
                    <Container maxWidth="sm"> {/*temporary testing buttons*/}
                        <Button color="inherit" onClick={() => { window.location.href = "/" }}>home</Button>
                        <Button color="inherit" onClick={() => { window.location.href = "/CalendarOverview" }}>CalendarOverview</Button>
                        <Button color="inherit" onClick={() => { window.location.href = "/Err" }}>Errorpage (testing right now)</Button>
                        <Button color="inherit" onClick={() => { window.location.href = "/MedicationPage" }}>Medicationpage</Button>

                        <Button color="inherit" onClick={() => { console.log(loggedIn)}}>console.log</Button>
                    </Container>
                    <Box className={classes.rightToolbar}>
                        {/*{renderLogButton(loggedIn)}                     */}
                        {loggedIn ? <LogoutButton/>:<LoginButton/>}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;