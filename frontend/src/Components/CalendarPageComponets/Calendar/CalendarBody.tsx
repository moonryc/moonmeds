import { Box, Grid } from "@mui/material";
import { add, getDay, sub } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { ICalendarDay } from "../../../../../Types/CalendarType";
import { centeredTextStyle } from "../../../Styles";
import CalendarDay from "./CalendarDay";

interface ICalendarBodyProps {
  numberOfDaysInMonth: number;
  firstDayValue: Date;
}

//TODO DOCSTRINGS on here

const CalendarBody:React.FC<ICalendarBodyProps> = ({numberOfDaysInMonth,firstDayValue}) => {
  //the day of week, 0 represents Sunday
  // const [firstDay, setFirstDay] = useState(getDay(firstDayValue));
  const firstDay = useMemo(() => getDay(firstDayValue), [firstDayValue]);
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
        let date = sub(firstDayValue, { days: 1 });
        tempArray.push({ index: 0, date: date });
      } else {
        let date = sub(tempArray[0].date, { days: 1 });
        tempArray.unshift({ index: 0, date: date });
      }
    }
    for (let i = 0; i < numberOfDaysInMonth; i++) {
      if (i === 0) {
        tempArray.push({ index: 1, date: firstDayValue });
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
  }, [firstDay, numberOfDaysInMonth]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box sx={{ overflow:'visible'}}>
      <br />
      <Grid container spacing={1} columns={7} sx={{display:'flex', alignContent:'center',justifyContent:'flex-start'}}>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Sun
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Mon
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Tues
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Wed
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Thurs
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Fri
        </Grid>
        <Grid item xs={1} sx={{display:'flex',...centeredTextStyle}}>
          Sat
        </Grid>
        {arrayOfMonthDays.map(
          (day) => (
            //@ts-ignore arrayOfMonthDays.indexOf(day) % 6 ? //
            <Grid
              sx={{ alignItems:'center', display:'flex', ...centeredTextStyle, }}
              item
              xs={1}
              key={arrayOfMonthDays.indexOf(day)}
            >
              {day.index !== 0 ? (
                <CalendarDay
                  date={day.date}
                 index={0} isRenderedOnHomePage={false}/>
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
