import React from 'react';
import AppbarTop from "../../Components/Standalone/AppbarTop";
import BackDrop from "../../Components/HomepageComponents/BackDrop";


//This Page is displayed at '/'

const Homepage = () => {
    return (
        <div>
            <AppbarTop />
            <BackDrop/>
        </div>
    )
};

export default Homepage;
