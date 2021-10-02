import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay} from "../../../Types/CalendarType";
import {UserContext} from "../../Misc/UserContext";




const CalendarDay = (props:ICalendarDay) => {

    const {setSelectedDay} = useContext(UserContext);

    const handleOnDayClick = () => {
      setSelectedDay(props.date)
    }


    return (
        <div>
            <IconButton onClick={()=>handleOnDayClick()}>
                 {props.index}
            </IconButton>
        </div>
    );
};

export default CalendarDay;
