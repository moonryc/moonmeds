import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from "@mui/material";
import {titleStyle} from "../../Styles";
import {reactLocalStorage} from "reactjs-localstorage";


const LogoutButton = () => {
    const handleClick = () => {
        reactLocalStorage.set("JWTToken", "")
        window.location.href = "/"
    }
    return (
        <div>
            {/*<form action={"/auth/logout"}>*/}
                <Button sx={titleStyle} type={"submit"} onClick={()=>handleClick()} value={"logout"}><LogoutIcon style={{marginRight: '15px'}} />Logout</Button>
            {/*</form>*/}
        </div>
    );
};

export default LogoutButton;
