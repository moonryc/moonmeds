import React from 'react';
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {

    return (
        <div>
            <form action={"/auth/logout"}>
                <Button type={"submit"} value={"logout"}><LogoutIcon style={{marginRight: '15px'}} />Logout</Button>
            </form>
        </div>
    );
};

export default LogoutButton;
