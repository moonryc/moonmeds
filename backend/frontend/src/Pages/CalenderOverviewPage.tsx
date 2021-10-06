import * as React from 'react';
import AppbarTop from "../Components/Standalone/AppbarTop";
import {CalendarContainer} from "../Context/CalendarContext";
import DisplayCalendarOverview from "../Components/CalendarPageComponets/DisplayCalendarOverview";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    outerWrapper: {
        height: '100vh',
        display:'flex',
        flexDirection: 'column'

    },
    innerWrapper:{
        background: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        flex: 1,
        height: '100%',
        padding: '5vh'

    }
}));

//TODO(Travis): Theming/CSS
const CalendarOverViewPage = () => {

    //const {selectedDay} = useContext(CalendarContext); COMMENTED UNTIL NEEDED


    const classes = useStyles();
    return (
        <div className={classes.outerWrapper}>
            <AppbarTop/>
            <div className={classes.innerWrapper}>
            <CalendarContainer >
                <DisplayCalendarOverview/> {/*@ts-ignore*/}
            </CalendarContainer>
            </div>
        </div>
    );
};

export default CalendarOverViewPage;
