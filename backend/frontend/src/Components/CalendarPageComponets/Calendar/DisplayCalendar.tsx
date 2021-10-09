import React, {useEffect, useState} from "react";
import getDaysInMonth from 'date-fns/getDaysInMonth'
import startOfMonth from 'date-fns/startOfMonth'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import {Paper} from "@mui/material";

const DisplayCalendar = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [numberOfDaysInSelectedMonth, setNumberOfDaysInSelectedMonth] = useState<number>(getDaysInMonth(selectedDate));
    const [startOfTheMonthInSelectedMonth, setStartOfTheMonthInSelectedMonth] = useState<Date>(startOfMonth(selectedDate));

    //Navigates back a month by changing the selected date
    const goBackAMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1))
    }
    //Navigates forward a month by changing the selected date
    const goForwardAMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1))
    }
    //updates the number of days in a month based on the selected date, and updates
    // the dart of the month when the selected date changes
    useEffect(() => {
        setNumberOfDaysInSelectedMonth(getDaysInMonth(selectedDate))
        setStartOfTheMonthInSelectedMonth(startOfMonth(selectedDate))
    }, [selectedDate]);


    return (

        <div>
            <Paper sx={{position:'relative'}}>
                <CalendarHeader goForwardAMonth={goForwardAMonth} goBackAMonth={goBackAMonth} month={selectedDate}/>
                <CalendarBody numberOfDaysInMonth={numberOfDaysInSelectedMonth} firstDay={startOfTheMonthInSelectedMonth}/>
            </Paper>
        </div>

    );
}

export default DisplayCalendar;
