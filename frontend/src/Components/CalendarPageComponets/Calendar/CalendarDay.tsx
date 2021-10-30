import React, {useContext, useEffect, useState} from 'react';
import {Box, IconButton} from "@mui/material";
import {ICalendarDay, IRenderedOnHomePage} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, getDate, getDay, getMonth, getYear, isBefore, isEqual, parseISO} from "date-fns";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";
import {IMedicationDosagesBase} from "../../../../../Types/MedicationDosagesTypes";
import {dosagesOnSpecifiedDay} from "../../../Services/MedicationServices";
import isSameDay from 'date-fns/isSameDay'
import {NotificationsContext} from "../../../Context/NotificationsContext";


const CalendarDay = (props: ICalendarDay & { isRenderedOnHomePage: boolean }) => {


    //region Context
    /**
     * Context from Calendar and Medication
     */
    const {setSelectedDay, selectedDay} = useContext(CalendarContext);
    const {userMedicationDosages} = useContext(MedicationContext);
    //endregion

    /**
     * the medication dosages associated with this day in particular
     * TODO: This is to be used for styling
     *
     */
    const [medicationDosagesDetails, setMedicationDosagesDetails] = useState<IMedicationDosagesBase[] | []>(dosagesOnSpecifiedDay(props.date, userMedicationDosages));
    const [calendarDayColor, setCalendarDayColor] = useState({
        bgcolor: 'primary.main',
        width: ["5vw",'5vw','5vw','55px'],
        height: ["5vw",'5vw','5vw','55px'],
        color: '#000000',
        border: 0,
        borderRadius: '50%',
        borderColor: 'primary.main'
    });


    /**
     * updates calendar context regarding what day is currently selected
     * and sets the context details to whatever the
     * selected days medicationDetails are
     */
    const handleOnDayClick = () => {
        setSelectedDay(props.date);
        console.log(selectedDay)

    }


    const cssClassUpdater = () => {
        let isItToday = isToday()
        let isDayAFillday = isFillDay()
        let isMissed = isMissedDate()

        if (isItToday) {
            setCalendarDayColor({
                bgcolor: "primary.main",
                border: 1,
                width: ["5vw",'5vw','5vw','55px'],
                height: ["5vw",'5vw','5vw','55px'],
                borderRadius: "50%",
                color: 'text.primary',
                borderColor: "primary.light",



            })
            return
        }

        if (isMissed) {
            setCalendarDayColor({
                bgcolor: 'primary.main',
                width: ["5vw",'5vw','5vw','55px'],
                height: ["5vw",'5vw','5vw','55px'],
                color: '#ff0000',
                border: 0,
                borderRadius: '50%',
                borderColor: 'primary.main'
            })
            return
        }


        if (isDayAFillday) {
            setCalendarDayColor({
                bgcolor: 'primary.main',
                width: ["5vw",'5vw','5vw','55px'],
                height: ["5vw",'5vw','5vw','55px'],
                color: '#ffe800',
                border: 0,
                borderRadius: '50%',
                borderColor: 'primary.main'
            })
            return
        }

        setCalendarDayColor({
            bgcolor: 'primary.main',
            width: ["5vw",'5vw','5vw','55px'],
            height: ["5vw",'5vw','5vw','55px'],
            color: 'text.primary',
            border: 0,
            borderRadius: '50%',
            borderColor: 'primary.main'
        })

    }



    /**
     * tests if the componet represents today
     * @return boolean - true if it is today, false otherwise
     */
    const isToday = (): boolean => {
        return isSameDay(new Date(props.date), new Date())

    }

    const isFillDay = (): any => {

        if (medicationDosagesDetails != null) {
            for (let i in medicationDosagesDetails) {//@ts-ignore
                if (isSameDay(new Date(medicationDosagesDetails[i].nextFillDay), new Date(props.date))) {
                    return true
                }
                //ts-ignore
                console.log(medicationDosagesDetails[0].nextFillDay)
            }
        }
        // console.log(new Date(props.date))
        return false

    }

    const isMissedDate = (): any => {

        if (medicationDosagesDetails != null) {
            for (let i in medicationDosagesDetails) {
                if (medicationDosagesDetails[i].hasBeenMissed) {
                    return true
                }
            }
        }
        return false
    }
    const isSelectedDay = isSameDay(new Date(props.date), new Date(selectedDay))?{bgcolor:'primary.light'}:{}



    /**
     * updates the local variable medicationDosageDetails when dosages change
     */
    useEffect(() => {
        // let answer = getDatesUserMedication()
        setMedicationDosagesDetails(dosagesOnSpecifiedDay(props.date, userMedicationDosages))
    }, [userMedicationDosages, props.date]);


    useEffect(() => {
        cssClassUpdater()
    }, [medicationDosagesDetails])

    return (
        <Box>
            {/*if(props.date===today) color= cyan*/}
            {/*if(props.date===any fill date coming up) color= yellow*/}
            {/*if(props.date===any dose coming up) color= yellow*/}
            {/*if(props.date===missed dose) color=red*/}
            {/*else color=theme.text.primary*/}
            {/*@ts-ignore*/}
            <IconButton sx={{...calendarDayColor, ...isSelectedDay, fontSize:['3vw',,,'35px']}}
                        onClick={() => handleOnDayClick()}>
                {getDate(props.date)}
            </IconButton>
        </Box>
    );
};

export default CalendarDay;
