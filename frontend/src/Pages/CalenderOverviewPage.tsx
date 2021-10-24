import * as React from 'react';
import AppbarTop from "../Components/Standalone/AppbarTop";
import DisplayCalendarOverview from "../Components/CalendarPageComponets/DisplayCalendarOverview";
import {Box} from "@mui/material";
import {flexWrapperStyle, flex1ItemStyle, backgroundStyle} from "../Styles";


//TODO(Travis): Theming/CSS
const CalendarOverViewPage = () => {

    //const {selectedDay} = useContext(CalendarContext); COMMENTED UNTIL MOON NEEDS
    return (
        <Box sx={flexWrapperStyle}>
            <AppbarTop/>
            <Box sx={{...flex1ItemStyle, ...backgroundStyle}}>
                <DisplayCalendarOverview/>
            </Box>
        </Box>
    );
};

export default CalendarOverViewPage;
