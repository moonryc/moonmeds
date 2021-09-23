import React from 'react';
import {AppBar, Box, Button, Container, makeStyles, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        background: theme.palette.primary.main,
        color: theme.palette.text.primary
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: 0
    }
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();
    return(
        <>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Moons Meds {'>'}:)
                    </Typography>
                    <Container maxWidth="sm">
                        <Button color="inherit" onClick={() => { console.log(window.location.href)}}>console.log</Button>
                    </Container>
                    <Box className={classes.rightToolbar}>
                        <Button>Login</Button>
                        <Button>Sign up</Button>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;
