import React, {useEffect, useState} from "react";
import getDaysInMonth from 'date-fns/getDaysInMonth'
import startOfMonth from 'date-fns/startOfMonth'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const DisplayCalendar = () => {

    //TODO maybe use the context
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    /**
     * number of days in the selected month
     */
    const [numberOfDaysInSelectedMonth, setNumberOfDaysInSelectedMonth] = useState<number>(getDaysInMonth(selectedDate));

    //TODO
    const [dayOfTheWeekOfTheFirstOfTheMonth, setDayOfTheWeekOfTheFirstOfTheMonth] = useState<Date>(startOfMonth(selectedDate));


    /**
     * Navigates back a month from the selected date
     */
    const goBackAMonth = (): void => {
        setSelectedDate(subMonths(selectedDate, 1))
    }

    /**
     * Navigates forward a month from the selected date
     */
    const goForwardAMonth = (): void => {
        setSelectedDate(addMonths(selectedDate, 1))
    }


    //updates the number of days in a month based on the selected date, and updates
    // the dart of the month when the selected date changes

    /**
     * updates the number of days in the selected month and updates the start of the selected month when the month is changed
     */
    useEffect(() => {
        setNumberOfDaysInSelectedMonth(getDaysInMonth(selectedDate))
        setDayOfTheWeekOfTheFirstOfTheMonth(startOfMonth(selectedDate))
    }, [selectedDate]);


    return (

        <div>
            <CalendarHeader goForwardAMonth={goForwardAMonth} goBackAMonth={goBackAMonth} month={selectedDate}/>
            <CalendarBody numberOfDaysInMonth={numberOfDaysInSelectedMonth}
                          firstDay={dayOfTheWeekOfTheFirstOfTheMonth}/>
        </div>

    );
}

export default DisplayCalendar;
