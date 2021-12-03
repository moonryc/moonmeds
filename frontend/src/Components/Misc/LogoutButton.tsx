import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {backgroundStyle, titleStyle} from "../../Styles";
import { reactLocalStorage } from "reactjs-localstorage";

const LogoutButton = () => {
    const xs = useMediaQuery('(min-width:0px) and (max-width:1199.99px)');
  const handleClick = () => {
    reactLocalStorage.set("JWTToken", "");
    window.location.href = "/";
  };
  return (
    <Box sx={{width:xs?undefined:'200px',display:'flex',justifyContent:'right'}}>
      {/*<form action={"/auth/logout"}>*/}
      <Button
        sx={{...titleStyle, bgcolor:'primary.main'}}
        type={"submit"}
        onClick={() => handleClick()}
        value={"logout"}
      >
          {!xs?<LogoutIcon style={{ marginRight: "15px" }} />:null}
        <Typography variant={xs?'body2':'h6'} sx={{fontSize:xs?'15px':null}}>Logout</Typography>
      </Button>
      {/*</form>*/}
    </Box>
  );
};

export default LogoutButton;
