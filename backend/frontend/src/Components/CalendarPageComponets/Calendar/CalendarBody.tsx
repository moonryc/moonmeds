import React, {useContext, useEffect, useMemo, useState} from 'react';
import {add, getDay, sub} from "date-fns";
import CalendarDay from "./CalendarDay";
import {Box, Grid, Paper} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";
// sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}
const useStyles = makeStyles((theme?: any) => ({
    gridItem: {
        position: 'relative',
        left:'0',
        right:'0',
        textAlign:'center'
    }
}));

interface ICalendarBodyProps {
    numberOfDaysInMonth: number,
    firstDay: Date,
}

//TODO DOCSTRINGS on here


const CalendarBody = (props: ICalendarBodyProps) => {
    //const today = new Date();
    const useStyles = makeStyles({

    })



    //the day of week, 0 represents Sunday
    // const [firstDay, setFirstDay] = useState(getDay(props.firstDay));
    const firstDay = useMemo(() => getDay(props.firstDay), [props.firstDay])
    const [arrayOfMonthDays, setArrayOfMonthDays] = useState<ICalendarDay[]>([{
        index: 0,
        date: new Date(),
    }]);


    /**
     * updates the arrayOfMonthsDays to the correct number of days in a month when the selected month is changed
     */
    useEffect(() => {
        setArrayOfMonthDays([
            {
                index: 0,
                date: new Date(),

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
    const classes = useStyles();
    return (
        <Box >
            <br/>
            <Grid container spacing={1}>{/*//@ts-ignore*/}
                    <Grid sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}item xs={1.71428571}>
                        Sun
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Mon
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Tues
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Wed
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Thurs
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Fri
                    </Grid>{/*//@ts-ignore*/}
                    <Grid item xs={1.71428571} sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}}>
                        Sat
                    </Grid>
                {arrayOfMonthDays.map(day =>
                    //@ts-ignore arrayOfMonthDays.indexOf(day) % 6 ? //
                        <Grid sx={{position:'relative', left:'0', right:'0', textAlign: 'center',}} item xs={1.71428571} key={arrayOfMonthDays.indexOf(day)}>
                            {day.index !=0 ?<CalendarDay index={day.index} date={day.date} isRenderedOnHomePage={true}/>:<></>}<br/>
                        </Grid>
                        // :<CalendarDay index={day.index} date={day.date}/>
                )}
                </Grid>
        </Box>
    );
};

export default CalendarBody;
