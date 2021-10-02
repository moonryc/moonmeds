import React, {useContext} from 'react';
import {AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../Misc/UserContext";
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
}));

const AppbarTop: React.FC<{[key:string]: any}> = () => {
    const classes = useStyles();

    let {loggedIn:loggedIn} = useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
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

                        <MenuItem onClick={handleClose} ><HomeIcon /> </MenuItem>

                    </Menu>
                    {/*test speed dial*/}






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