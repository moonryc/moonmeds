import React, {useContext, useEffect, useMemo, useState} from 'react';
import {add, getDay, sub} from "date-fns";
import CalendarDay from "./CalendarDay";
import {Paper} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";

interface ICalendarBodyProps {
    numberOfDaysInMonth: number,
    firstDay: Date,
}

//TODO DOCSTRINGS on here


const CalendarBody = (props: ICalendarBodyProps) => {
    //const today = new Date();
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


    /**
     * updates the arrayOfMonthsDays to the correct number of days in a month when the selected month is changed
     */
    useEffect(() => {
        setArrayOfMonthDays([
            {
                index: 0,
                date: new Date()
            }
        ])
        let tempArray: ICalendarDay[] = []
        for (let i = 0; i < firstDay; i++) {
            if (i === 0) {
                let date = sub(props.firstDay, {days: 1})
                tempArray.push({index: 0, date: date})
            } else {
                let date = sub(tempArray[0].date, {days: 1})
                tempArray.unshift({index: 0, date: date})
            }
        }
        for (let i = 0; i < props.numberOfDaysInMonth; i++) {
            if (i === 0) {
                tempArray.push({index: 1, date: props.firstDay})
            } else {
                tempArray.push({index: i+1, date: add(tempArray[tempArray.length - 1].date, {days: 1})})
            }
        }
        setArrayOfMonthDays(tempArray)
        console.log(arrayOfMonthDays)
        console.log(firstDay)
    }, [firstDay]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <br/>
            <Paper>
                <div className={classes.weekContainer}>
                    <div className={classes.dayItem}>
                        Sun
                    </div>
                    <div className={classes.dayItem}>
                        Mon
                    </div>
                    <div className={classes.dayItem}>
                        Tues
                    </div>
                    <div className={classes.dayItem}>
                        Wed
                    </div>
                    <div className={classes.dayItem}>
                        Thurs
                    </div>
                    <div className={classes.dayItem}>
                        Fri
                    </div>
                    <div className={classes.dayItem}>
                        Sat
                    </div>
                {arrayOfMonthDays.map(day =>
                    // arrayOfMonthDays.indexOf(day) % 6 ?
                        <div className={classes.dayItem} key={arrayOfMonthDays.indexOf(day)}>
                            {day.index !=0 ?<CalendarDay index={day.index} date={day.date}/>:<></>}<br/>
                        </div>
                        // :<CalendarDay index={day.index} date={day.date}/>
                )}
                </div>
            </Paper>
        </div>
    );
};

export default CalendarBody;
