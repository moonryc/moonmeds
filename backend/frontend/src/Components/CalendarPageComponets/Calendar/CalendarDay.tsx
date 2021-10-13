import React, {useContext, useEffect, useState} from 'react';
import {Box, IconButton} from "@mui/material";
import {ICalendarDay, IRenderedOnHomePage} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, getDate, getDay, getMonth, getYear, isBefore, isEqual, parseISO} from "date-fns";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";
import {IMedicationDosagesSchema} from "../../../../../Types/MedicationType";
import {dosagesOnSpecifiedDay} from "../../../Services/MedicationServices";
import isSameDay from 'date-fns/isSameDay'


const useStyles = makeStyles((theme?: any) => ({
    todayStyle: {
        backgroundColor: '#00FFFF',
        width: '45px',
        height: '45px',
        color: '#000000'
    },
    upcoming:{
        backgroundColor: '#ffe800',
        width: '45px',
        height: '45px',
        color: '#000000'
    },
    missed:{
        backgroundColor: '#ff0000',
        width: '45px',
        height: '45px',
        color: '#000000'
    },
    otherStyle: {
        backgroundColor: '#FFFFFF',
        width: '45px',
        height: '45px',
        color: '#000000'
    }
}));


const CalendarDay = (props: ICalendarDay & {isRenderedOnHomePage: boolean}) => {
    const {selectedDayDetails} = useContext(CalendarContext);
    const classes = useStyles();

    //region Context
    /**
     * Context from Calendar and Medication
     */
    const {setSelectedDay} = useContext(CalendarContext);
    const {userMedicationDosages} = useContext(MedicationContext);
    //endregion

    /**
     * the medication dosages associated with this day in particular
     * TODO: This is to be used for styling
     *
     */
    const [medicationDosagesDetails, setMedicationDosagesDetails] = useState<IMedicationDosagesSchema[] | []>(dosagesOnSpecifiedDay(props.date,userMedicationDosages));


    /**
     * updates calendar context regarding what day is currently selected
     * and sets the context details to whatever the
     * selected days medicationDetails are
     */
    const handleOnDayClick = () => {
        setSelectedDay(props.date); //@ts-ignore
        console.log(medicationDosagesDetails)
    }

    /**
     * tests if the componet represents today
     * @return boolean - true if it is today, false otherwise
     */
    const isToday = ():boolean => {
        return format(props.date, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy');
    }

    const isImportantUpcomingDate= ():any => {

         if(medicationDosagesDetails != null){
             for(let i in medicationDosagesDetails){//@ts-ignore
                 if(isSameDay(new Date(medicationDosagesDetails[i].nextFillDay), new Date(props.date))){
                     return true
                 }
                 //ts-ignore
                 console.log(medicationDosagesDetails[0].nextFillDay)
             }
         }
        console.log(new Date(props.date))
             return false

    }

    const isMissedDate= ():any => {

        if(medicationDosagesDetails != null){
            for(let i in medicationDosagesDetails){//@ts-ignore
                if(medicationDosagesDetails[i].isLateToTakeMedication === true) {
                    return true
                }
            }
        }
        return false
    }


    /**
     * updates the local variable medicationDosageDetails when dosages change
     */
    useEffect(() => {
        // let answer = getDatesUserMedication()
        setMedicationDosagesDetails(dosagesOnSpecifiedDay(props.date,userMedicationDosages))
    }, [userMedicationDosages]);


    return (
        <Box >
            {/*if(props.date===today) color= cyan*/}
            {/*if(props.date===any fill date coming up) color= yellow*/}
            {/*if(props.date===any dose coming up) color= yellow*/}
            {/*if(props.date===missed dose) color=red*/}
            {/*else color=theme.text.primary*/}
            <IconButton className={isToday() ? classes.todayStyle:isImportantUpcomingDate()? classes.upcoming:isMissedDate()?classes.missed: classes.otherStyle}
                        onClick={() => handleOnDayClick()}>
                {getDate(props.date)}
            </IconButton>
        </Box>
    );
};

export default CalendarDay;
