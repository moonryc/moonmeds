import React, {useEffect, useMemo, useState} from 'react';
import {add, getDay, sub} from "date-fns";
import CalendarDay from "./CalendarDay";
import {Box, Grid, Paper} from "@mui/material";
import {ICalendarDay} from "../../../Types/CalendarType";
import {makeStyles} from "@mui/styles";

interface ICalendarBodyProps {
    numberOfDaysInMonth: number,
    firstDay: Date,
}


const CalendarBody = (props: ICalendarBodyProps) => {

    const useStyles = makeStyles({
        weekContainer:{
            display:"flex",
            flexWrap: "wrap",
        },
        dayItem:{
          flexBasis:"14.28%",
        }
    })

    const classes = useStyles();


    //the day of week, 0 represents Sunday
    // const [firstDay, setFirstDay] = useState(getDay(props.firstDay));
    const firstDay = useMemo(() => getDay(props.firstDay), [props.firstDay])
    const [arrayOfMonthDays, setArrayOfMonthDays] = useState<ICalendarDay[]>([{
        index: 0,
        date: new Date()
    }]);

    useEffect(() => {
        setArrayOfMonthDays([
            {
                index: 0,
                date: new Date()
            }
        ])
        let tempArray: ICalendarDay[] = []
        for (let i = 0; i < firstDay - 1; i++) {
            if (i == 0) {
                let date = sub(props.firstDay, {days: 1})
                tempArray.push({index: 0, date: date})
            } else {
                let date = sub(tempArray[0].date, {days: 1})
                tempArray.unshift({index: 0, date: date})
            }
        }
        for (let i = 0; i <= props.numberOfDaysInMonth; i++) {
            if (i == 0) {
                tempArray.push({index: 0, date: props.firstDay})
            } else {
                tempArray.push({index: i, date: add(tempArray[tempArray.length - 1].date, {days: 1})})
            }
        }
        setArrayOfMonthDays(tempArray)
        console.log(arrayOfMonthDays)
        console.log(firstDay)
    }, [firstDay]);

    return (
        <div>
            <br/>
            <Paper>
                <div className={classes.weekContainer}>
                    <div className={classes.dayItem}>
                        Sunday
                    </div>
                    <div className={classes.dayItem}>
                        Monday
                    </div>
                    <div className={classes.dayItem}>
                        Tuesday
                    </div>
                    <div className={classes.dayItem}>
                        Wednesday
                    </div>
                    <div className={classes.dayItem}>
                        Thursday
                    </div>
                    <div className={classes.dayItem}>
                        Friday
                    </div>
                    <div className={classes.dayItem}>
                        Saturday
                    </div>
                {arrayOfMonthDays.map(day =>
                    // arrayOfMonthDays.indexOf(day) % 6 ?
                        <div className={classes.dayItem}>
                            <CalendarDay index={day.index} date={day.date}/><br/>
                        </div>
                        // :<CalendarDay index={day.index} date={day.date}/>
                )}
                </div>
            </Paper>
        </div>
    );
};

export default CalendarBody;
