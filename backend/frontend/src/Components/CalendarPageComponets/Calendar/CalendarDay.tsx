import React, {useContext, useEffect, useState} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay, IRenderedOnHomePage} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, getDate, getDay, getMonth, getYear, isBefore, isEqual, parseISO} from "date-fns";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";
import {IMedicationDosagesSchema} from "../../../../../Types/MedicationType";


const useStyles = makeStyles((theme?: any) => ({
    todayStyle: {
        backgroundColor: '#00FFFF',
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

    const classes = useStyles();

    const {setSelectedDay,setSelectedDayDetails} = useContext(CalendarContext);
    const {userMedicationDosages,userMedications} = useContext(MedicationContext);

    //to be used for rending colour changes
    const [medicationDosagesDetails, setMedicationDosagesDetails] = useState<IMedicationDosagesSchema[]|[]>([]);


    const handleOnDayClick = () => {
        setSelectedDay(props.date);
        console.log(format(props.date, 'MM/dd/yyyy'));
        setSelectedDayDetails([...medicationDosagesDetails])

    }

    //style logic
    const isToday = (calendarDate: Date) => {
        return format(calendarDate, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy');
    }

    const getDatesUserMedication = (userMedicationDosagesArray: IMedicationDosagesSchema[] ) => {

        if(userMedicationDosagesArray==null){
            return []
        }

        let date = new Date(getYear(props.date), getMonth(props.date), getDate(props.date))
        let results = userMedicationDosagesArray.filter(dosage=>isEqual(date,new Date(
            getYear(parseISO(dosage.time.toString())),
            getMonth(parseISO(dosage.time.toString())),
            getDate(parseISO(dosage.time.toString())))))

        return results
    }

    //updates if the user clicks on a day or if the userMedicationDosages in context is updated
    useEffect(() => {
        let answer = getDatesUserMedication(userMedicationDosages)
        setMedicationDosagesDetails([...answer])
        setSelectedDayDetails([...answer])
    }, [userMedications,userMedicationDosages]);


    return (
        <div>
            {/*if(props.date===today) color= cyan*/}
            {/*if(props.date===any fill date coming up) color= yellow*/}
            {/*if(props.date===any dose coming up) color= yellow*/}
            {/*if(props.date===missed dose) color=red*/}
            {/*else color=theme.text.primary*/}
            <IconButton className={isToday(props.date) ? classes.todayStyle : classes.otherStyle}
                        onClick={() => handleOnDayClick()}>
                {getDate(props.date)}
            </IconButton>
        </div>
    );
};

export default CalendarDay;
