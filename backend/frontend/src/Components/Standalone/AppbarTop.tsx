import React, {useContext} from 'react';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../../Context/UserContext";
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
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
    appBar: {
        background: theme.palette.primary.main,
        height: '60px',
        position: 'relative',

    },
    icon: {
        color: theme.palette.text.primary,
        marginRight: '15px'
    }
}));

const AppbarTop: React.FC<{ [key: string]: any }> = () => {
    const classes = useStyles();

    //region Context
    /**
     * User context for checking is the user is in fact logged in
     */
    let {loggedIn} = useContext(UserContext);
    //endregion

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = (path: string) => {
        setAnchorEl(null);
        if (typeof path == typeof "") {
            window.location.href = path
        }
    };


    return (
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
                        sx={{color: 'text.primary'}}
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

                        <MenuItem onClick={() => handleClose('/')}><HomeIcon className={classes.icon}/> Home </MenuItem>
                        <MenuItem onClick={() => handleClose('/CalendarOverview')}><DateRangeIcon
                            className={classes.icon}/> Calendar Overview </MenuItem>
                        <MenuItem onClick={() => handleClose('/UserAccount')}>User Settings </MenuItem>
                    </Menu>
                    <Box sx={{position: 'absolute', right: 20}}>
                        {loggedIn ? <LogoutButton/> : <LoginButton/>}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )

};

export default AppbarTop;