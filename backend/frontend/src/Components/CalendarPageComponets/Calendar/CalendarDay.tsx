import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../CalendarContext";
import {getDate} from "date-fns";




const CalendarDay = (props:ICalendarDay) => {

    const {setSelectedDay} = useContext(CalendarContext);

    const handleOnDayClick = () => {
      setSelectedDay(props.date)
    }

    //TODO: make it not render last months dates
    return (
        <div>
            <IconButton onClick={()=>handleOnDayClick()}>
                 {getDate(props.date)}
            </IconButton>
        </div>
    );
};

export default CalendarDay;
