import * as React from 'react';
import AppbarTop from "../Components/Standalone/AppbarTop";
import {CalendarContainer} from "../Components/CalendarPageComponets/CalendarContext";
import DisplayCalendarOverview from "../Components/CalendarPageComponets/DisplayCalendarOverview";


//TODO(Travis): Theming/CSS
const CalendarOverViewPage = () => {

    return (
        <div>
            <AppbarTop/>
            <CalendarContainer>
                <DisplayCalendarOverview/>
            </CalendarContainer>
        </div>
    );
};

export default CalendarOverViewPage;
