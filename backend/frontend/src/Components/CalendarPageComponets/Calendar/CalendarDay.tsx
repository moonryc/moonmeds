import React, {useContext, useEffect, useState} from 'react';
import {IconButton} from "@mui/material";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, getDate, getDay, getMonth, getYear, isBefore, isEqual, parseISO} from "date-fns";
import {makeStyles} from "@mui/styles";
import {MedicationContext} from "../../../Context/MedicationContext";
import {IMedicationDosagesSchema} from "../../../../../Types/MedicationType";
import {dosagesOnSpecifiedDay} from "../../../Services/MedicationServices";


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
        setSelectedDay(props.date);
    }

    /**
     * tests if the componet represents today
     * @return boolean - true if it is today, false otherwise
     */
    const isToday = ():boolean => {
        return format(props.date, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy');
    }

    /**
     * updates the local variable medicationDosageDetails when dosages change
     */
    useEffect(() => {
        // let answer = getDatesUserMedication()
        setMedicationDosagesDetails(dosagesOnSpecifiedDay(props.date,userMedicationDosages))
    }, [userMedicationDosages]);


    return (
        <div>
            {/*if(props.date===today) color= cyan*/}
            {/*if(props.date===any fill date coming up) color= yellow*/}
            {/*if(props.date===any dose coming up) color= yellow*/}
            {/*if(props.date===missed dose) color=red*/}
            {/*else color=theme.text.primary*/}
            <IconButton className={isToday() ? classes.todayStyle : classes.otherStyle}
                        onClick={() => handleOnDayClick()}>
                {getDate(props.date)}
            </IconButton>
        </div>
    );
};

export default CalendarDay;
