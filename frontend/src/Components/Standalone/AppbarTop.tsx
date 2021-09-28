import React, {useContext} from 'react';
import {AppBar, Box, Button, Container, makeStyles, Toolbar, Typography} from "@material-ui/core";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../Misc/UserContext";
import {SpeedDial, SpeedDialAction} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MedicationIcon from '@mui/icons-material/Medication';
import {MediaBluetoothOn} from "@mui/icons-material";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        background: theme.palette.primary.main,
        color: theme.palette.text.primary,
        paddingLeft: '64px'
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: 0
    },
    appBar:{
        height: '60px',
        position: 'relative'

    },
    speeddial:{
        color: theme.palette.secondary.main,
        overflow: 'visible',
    }
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();
    const actions = [
        { icon: <HomeIcon />, name: "Home", path: "/" },
        { icon: <DateRangeIcon />, name: "Calendar Overview", path: '/CalendarOverview' },
        { icon: <MedicationIcon />, name: "Medication", path: '/MedicationPage' }
    ];

    let {loggedIn:loggedIn} = useContext(UserContext);



    return(
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>


                    {/*test speed dial*/}
                    <SpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<MenuIcon/>}
                        direction='down'
                        sx={{ position: 'absolute', top: 0, left: 0}}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                sx={{color:'primary.main'}}
                                onClick={() => { window.location.href = action.path }}
                            />
                        ))}
                    </SpeedDial>




                    <Typography variant="h6" className={classes.title}>
                        Moons Meds {'>'}:)
                    </Typography>
                    <Container maxWidth="lg"> {/*temporary testing buttons*/}
                        <Button color="inherit" onClick={() => { window.location.href = "/Err" }}>Error page (testing right now)</Button>

                        <Button color="inherit" onClick={() => { console.log(loggedIn)}}>console.log</Button>
                    </Container>
                    <Box className={classes.rightToolbar}>
                        {loggedIn ? <LogoutButton/>:<LoginButton/>}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;