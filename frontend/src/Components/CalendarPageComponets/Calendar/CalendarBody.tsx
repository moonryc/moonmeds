import { Box, Grid } from "@mui/material";
import { add, getDay, sub } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { ICalendarDay } from "../../../../../Types/CalendarType";
import { centeredTextStyle } from "../../../Styles";
import CalendarDay from "./CalendarDay";

interface ICalendarBodyProps {
  numberOfDaysInMonth: number;
  firstDay: Date;
}

//TODO DOCSTRINGS on here

const CalendarBody = (props: ICalendarBodyProps) => {
  //the day of week, 0 represents Sunday
  // const [firstDay, setFirstDay] = useState(getDay(props.firstDay));
  const firstDay = useMemo(() => getDay(props.firstDay), [props.firstDay]);
  const [arrayOfMonthDays, setArrayOfMonthDays] = useState<ICalendarDay[]>([
    {
      index: 0,
      date: new Date(),
    },
  ]);

  /**
   * updates the arrayOfMonthsDays to the correct number of days in a month when the selected month is changed
   */
  useEffect(() => {
    setArrayOfMonthDays([
      {
        index: 0,
        date: new Date(),
      },
    ]);
    let tempArray: ICalendarDay[] = [];
    for (let i = 0; i < firstDay; i++) {
      if (i === 0) {
        let date = sub(props.firstDay, { days: 1 });
        tempArray.push({ index: 0, date: date });
      } else {
        let date = sub(tempArray[0].date, { days: 1 });
        tempArray.unshift({ index: 0, date: date });
      }
    }
    for (let i = 0; i < props.numberOfDaysInMonth; i++) {
      if (i === 0) {
        tempArray.push({ index: 1, date: props.firstDay });
      } else {
        tempArray.push({
          index: i + 1,
          date: add(tempArray[tempArray.length - 1].date, { days: 1 }),
        });
      }
    }
    setArrayOfMonthDays(tempArray);
    console.log(arrayOfMonthDays);
    console.log(firstDay);
  }, [firstDay, props.numberOfDaysInMonth]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box sx={{ overflow:'visible'}}>
      <br />
      <Grid container spacing={1} columns={7}>
        <Grid item xs={1} sx={centeredTextStyle}>
          Sun
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Mon
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Tues
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Wed
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Thurs
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Fri
        </Grid>
        <Grid item xs={1} sx={centeredTextStyle}>
          Sat
        </Grid>
        {arrayOfMonthDays.map(
          (day) => (
            //@ts-ignore arrayOfMonthDays.indexOf(day) % 6 ? //
            <Grid
              sx={{ ...centeredTextStyle, height: ['50px'],  }}
              item
              xs={1}
              key={arrayOfMonthDays.indexOf(day)}
            >
              {day.index !== 0 ? (
                <CalendarDay
                  index={day.index}
                  date={day.date}
                  isRenderedOnHomePage={true}
                />
              ) : (
                <></>
              )}
              <br />
            </Grid>
          )
          // :<CalendarDay index={day.index} date={day.date}/>
        )}
      </Grid>
    </Box>
  );
};
//todo  change calendar to flex to scale when screen gets smaller
export default CalendarBody;
