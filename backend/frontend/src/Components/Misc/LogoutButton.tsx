import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from "@mui/material";
import {titleStyle} from "../../Styles";


const LogoutButton = () => {
    return (
        <div>
            <form action={"/auth/logout"}>
                <Button sx={titleStyle} type={"submit"} value={"logout"}><LogoutIcon style={{marginRight: '15px'}} />Logout</Button>
            </form>
        </div>
    );
};

export default LogoutButton;
