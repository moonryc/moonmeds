import React from "react";
import AppbarTop from "../../Components/Standalone/AppbarTop";
import BackDrop from "../../Components/HomepageComponents/BackDrop";
import { Box } from "@mui/material";
import { flexWrapperStyle } from "../../Styles";

//This Page is displayed at '/'
//TODO fix props any
const Homepage = (props: any) => {
  return (
    <Box sx={flexWrapperStyle}>
      <AppbarTop />
      <BackDrop />
    </Box>
  );
};

export default Homepage;
