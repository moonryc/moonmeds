import React, {useContext, useState} from 'react';
import {AppBar, Box, Button, Container, makeStyles, Toolbar, Typography} from "@material-ui/core";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../Misc/UserContext";

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


    const user = useContext(UserContext);
    console.log(user)

    return(
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Moons Meds {'>'}:)
                    </Typography>
                    <Container maxWidth="sm">
                        <Button color="inherit" onClick={() => { console.log(user)}}>console.log</Button>
                    </Container>
                    <Box className={classes.rightToolbar}>
                        <LoginButton/>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;