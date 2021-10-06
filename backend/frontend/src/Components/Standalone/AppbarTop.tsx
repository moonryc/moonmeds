import React, {useContext} from 'react';
import {AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../../Context/UserContext";
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
    icon:{
        color: theme.palette.text.primary,
        marginRight:'15px'
    }
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();

    let {loggedIn} = useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = (path:string) => {
        setAnchorEl(null);
    //Travis I fucking hate your guts, $10 says ill change this and you wont even notice
        if(path!= '[object Object]') {
            window.location.href = path
        }
    };


    return(
        <>
            <AppBar position="static"
                    className={classes.appBar}
            >
                <Toolbar>

                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color:'text.primary'}}
                    >
                        Dashboard
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <MenuItem onClick={()=>handleClose('/')} ><HomeIcon className={classes.icon} /> Home </MenuItem>
                        <MenuItem onClick={()=>handleClose('/CalendarOverview')} ><DateRangeIcon className={classes.icon} /> Calendar Overview </MenuItem>
                        <MenuItem onClick={()=>handleClose('/Err')} ><ErrorOutlineIcon className={classes.icon} /> Error/ testing  </MenuItem>
                        <MenuItem onClick={()=>handleClose('/')} ><MedicationIcon className={classes.icon} /> MedicationPage </MenuItem>

                    </Menu>


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