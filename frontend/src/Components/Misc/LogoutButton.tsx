import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {backgroundStyle, primaryIconTextStyle, titleStyle} from "../../Styles";
import { reactLocalStorage } from "reactjs-localstorage";

const LogoutButton = () => {
    const xs = useMediaQuery('(min-width:0px) and (max-width:1199.99px)');
  const handleClick = () => {
    reactLocalStorage.set("JWTToken", "");
    window.location.href = "/";
  };
  return (

      <Button
        sx={{...primaryIconTextStyle, margin:'5px'}}
        type={"submit"}
        onClick={() => handleClick()}
        value={"logout"}
      >
          {!xs?<LogoutIcon style={{ marginRight: "15px" }} />:null}
        <Typography variant='h6'>Logout</Typography>
      </Button>

  );
};

export default LogoutButton;
