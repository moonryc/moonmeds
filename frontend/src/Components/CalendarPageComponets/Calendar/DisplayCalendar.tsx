import { Box, Grid, Typography } from "@mui/material";
import addMonths from "date-fns/addMonths";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfMonth from "date-fns/startOfMonth";
import subMonths from "date-fns/subMonths";
import React, { useEffect, useState } from "react";
import { centeredTextStyle } from "../../../Styles";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

const DisplayCalendar = () => {
  //TODO maybe use the context
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /**
   * number of days in the selected month
   */
  const [numberOfDaysInSelectedMonth, setNumberOfDaysInSelectedMonth] =
    useState<number>(getDaysInMonth(selectedDate));

  //TODO
  const [
    dayOfTheWeekOfTheFirstOfTheMonth,
    setDayOfTheWeekOfTheFirstOfTheMonth,
  ] = useState<Date>(startOfMonth(selectedDate));

  /**
   * Navigates back a month from the selected date
   */
  const goBackAMonth = (): void => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  /**
   * Navigates forward a month from the selected date
   */
  const goForwardAMonth = (): void => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  //updates the number of days in a month based on the selected date, and updates
  // the dart of the month when the selected date changes

  /**
   * updates the number of days in the selected month and updates the start of the selected month when the month is changed
   */
  useEffect(() => {
    setNumberOfDaysInSelectedMonth(getDaysInMonth(selectedDate));
    setDayOfTheWeekOfTheFirstOfTheMonth(startOfMonth(selectedDate));
  }, [selectedDate]);

  return (
    <Box sx={{ padding: "2.5vh", overflow:'visible' }}>
      <Box sx={{width:'100%',display:'flex'}}>
          <Typography
            sx={{
              width:'30%',
              ...centeredTextStyle,
              textAlign: ["left"],
              fontSize: ['15px'],
            }}
          >
            Calendar
          </Typography>


      <Box sx={{width:'70%',}}>
          <CalendarHeader
            goForwardAMonth={goForwardAMonth}
            goBackAMonth={goBackAMonth}
            month={selectedDate}
          />
      </Box>
      </Box>

      <CalendarBody
        numberOfDaysInMonth={numberOfDaysInSelectedMonth}
        firstDayValue={dayOfTheWeekOfTheFirstOfTheMonth}
      />
    </Box>
  );
};

export default DisplayCalendar;
