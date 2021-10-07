import React, {useContext, useEffect, useState} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
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


const CalendarDay = (props: ICalendarDay) => {


    let today = format(new Date(), 'MM/dd/yyyy');
    const classes = useStyles();

    const {setSelectedDay, setSelectedDayDetails} = useContext(CalendarContext);

    const {userMedicationDosages} = useContext(MedicationContext);

    const [medicationDosagesDetails, setMedicationDosagesDetails] = useState<IMedicationDosagesSchema[]>([]);


    const handleOnDayClick = () => {
        setSelectedDay(props.date);
        console.log(format(props.date, 'MM/dd/yyyy'));
        getDatesUserMedication(userMedicationDosages)
        console.log(today);
        console.log(medicationDosagesDetails);
        console.log(userMedicationDosages)

    }

    //style logic
    const isToday = (prop: any) => {
        return format(prop, 'MM/dd/yyyy') === today;
    }

    const getDatesUserMedication = (userMedicationDosagesArray: IMedicationDosagesSchema[] | null) => {
        if (userMedicationDosagesArray == null) {
            console.log("userMEdicationDosageArray is null")
            return
        }

        let date = new Date(getYear(props.date), getMonth(props.date), getDay(props.date))
        let results = userMedicationDosagesArray.filter(dosage=>isEqual(date,new Date(
            getYear(parseISO(dosage.time.toString())),
            getMonth(parseISO(dosage.time.toString())),
            getDay(parseISO(dosage.time.toString())))))

        setSelectedDayDetails(results)
        setMedicationDosagesDetails(results)



    }

    useEffect(() => {
        setSelectedDayDetails(medicationDosagesDetails)
    }, [medicationDosagesDetails]);


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
