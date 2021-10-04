import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    button: {
        color: theme.palette.text.primary
    }
}));

const LoginButton = () => {
    const classes = useStyles();
    return (
        <div>
            <form action={"/auth/login"}>
                <Button className={classes.button} type={"submit"} value={"login"}> <LoginIcon style={{marginRight: '15px'}}/>Login/ Sign up </Button>
            </form>
        </div>
    );
};

export default LoginButton;
