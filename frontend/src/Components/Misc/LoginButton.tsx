import React from 'react';
import {Button} from "@material-ui/core";
import LoginIcon from '@mui/icons-material/Login';

const LoginButton = () => {

    return (
        <div>
            <form action={"/auth/login"}>
                <Button type={"submit"} value={"login"}> <LoginIcon style={{marginRight: '15px'}}/>Login/ Sign up </Button>
            </form>
        </div>
    );
};

export default LoginButton;
