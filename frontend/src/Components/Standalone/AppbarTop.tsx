import React, {useContext} from 'react';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../Misc/UserContext";
import {SpeedDial, SpeedDialAction} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MedicationIcon from '@mui/icons-material/Medication';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        background: theme.palette.primary.main,
        color: theme.palette.text.primary,
        paddingLeft: '64px',
        maxHeight: '55px'
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: 0,
        color: '#f60000'
    },
    appBar:{
        background: theme.palette.primary.main,
        height: '60px',
        position: 'relative',

    },
    speeddial:{
        overflow: 'visible',
        background: '#f60000',
    }
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();
    const actions = [
        { icon: <HomeIcon />, name: "Home", path: "/" },
        { icon: <DateRangeIcon />, name: "Calendar Overview", path: '/CalendarOverview' },
        { icon: <MedicationIcon />, name: "Medication", path: '/MedicationPage' },
        { icon: <ErrorOutlineIcon />, name: "Error/ Testing", path: '/Err' }
    ];

    let {loggedIn:loggedIn} = useContext(UserContext);



    return(
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>


                    {/*test speed dial*/}
                    <SpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<MenuIcon className={classes.speeddial}/>}
                        direction='down'
                        sx={{ position: 'absolute', top: 0, left: 0}}


                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => { window.location.href = action.path }}

                            />
                        ))}
                    </SpeedDial>




                    <Typography variant="h6" className={classes.title}>
                        Moons Meds {'>'}:)
                    </Typography>
                    <Container maxWidth="sm">
                        <Button color="inherit" onClick={() => { console.log(loggedIn)}}>console.log</Button>
                    </Container>
                    <Box>
                        {loggedIn ? <LogoutButton />:<LoginButton />}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;