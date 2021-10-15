import React, {useContext} from 'react';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";
import {UserContext} from "../../Context/UserContext";
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {primaryIconTextStyle, titleStyle} from "../../Styles";


const AppbarTop: React.FC<{ [key: string]: any }> = () => {

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
                    sx={{
                        bgcolor: 'primary.main',
                        height: '60px',
                        position: 'relative',
                    }}
                    elevation={1}
            >
                <Toolbar>

                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={titleStyle}
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

                        <MenuItem onClick={() => handleClose('/')}><HomeIcon sx={primaryIconTextStyle}/> Home </MenuItem>
                        <MenuItem onClick={() => handleClose('/CalendarOverview')}><DateRangeIcon
                            sx={primaryIconTextStyle}/> Calendar Overview </MenuItem>
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