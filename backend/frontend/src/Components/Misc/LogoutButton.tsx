import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    button: {
        color: theme.palette.text.primary
    }
}));

const LogoutButton = () => {
    const classes = useStyles();
    return (
        <div>
            <form action={"/auth/logout"}>
                <Button className={classes.button} type={"submit"} value={"logout"}><LogoutIcon style={{marginRight: '15px'}} />Logout</Button>
            </form>
        </div>
    );
};

export default LogoutButton;
