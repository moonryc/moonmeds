import React, {useContext} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, getDate} from "date-fns";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme?: any) => ({
    todayStyle:{
        backgroundColor: '#00FFFF',
        width: '45px',
        height: '45px',
        color: '#000000'
    },
    otherStyle:{
        backgroundColor: '#FFFFFF',
        width: '45px',
        height: '45px',
        color: '#000000'
    }
}));



const CalendarDay = (props:ICalendarDay) => {
    let today = format(new Date(),'MM/dd/yyyy');
    const classes = useStyles();

    const {setSelectedDay} = useContext(CalendarContext);


    const handleOnDayClick = () => {
      setSelectedDay(props.date);
      console.log(format(props.date,'MM/dd/yyyy'));
      console.log(today);
    }

    //style logic
    const isToday = (prop:any) => {
        return format(prop, 'MM/dd/yyyy') === today;
    }

    const x = () => {

    }

    return (
        <div>
            {/*if(props.date===today) color= cyan*/}
            {/*if(props.date===any fill date coming up) color= yellow*/}
            {/*if(props.date===any dose coming up) color= yellow*/}
            {/*if(props.date===missed dose) color=red*/}
            {/*else color=theme.text.primary*/}
            <IconButton  className={isToday(props.date)? classes.todayStyle : classes.otherStyle} onClick={()=>handleOnDayClick()}>
                 {getDate(props.date)}
            </IconButton>
        </div>
    );
};

export default CalendarDay;
