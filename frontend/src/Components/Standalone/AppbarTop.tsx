import { AppBar, Box, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import LoginButton from "../Misc/LoginButton";
import LogoutButton from "../Misc/LogoutButton";

const AppbarTop: React.FC<{ [key: string]: any }> = () => {
  //region Context
  /**
   * User context for checking is the user is in fact logged in
   */
  let { loggedIn } = useContext(UserContext);
  //endregion



  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.main",
          height: "60px",
          position: "relative",
        }}
        elevation={1}
      >
        <Toolbar>
          <Box sx={{ position: "absolute", right: 20 }}>
            {loggedIn ? <LogoutButton /> : <LoginButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppbarTop;
