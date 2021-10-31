import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import React from "react";
import { primaryIconTextStyle, titleStyle } from "../../Styles";

const LoginButton = () => {
  return (
    <div>
      <form action={"/Login"}>
        <Button sx={titleStyle} type={"submit"} value={"login"}>
          {" "}
          <LoginIcon sx={primaryIconTextStyle} />
          Login/ Sign up{" "}
        </Button>
      </form>
    </div>
  );
};

export default LoginButton;
