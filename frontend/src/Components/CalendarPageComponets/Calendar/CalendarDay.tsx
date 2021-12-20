import {Box, IconButton} from "@mui/material";
import {getDate} from "date-fns";
import isSameDay from "date-fns/isSameDay";
import React, {useContext, useState} from "react";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {IMedicationDosagesBase} from "../../../../../Types/MedicationDosagesTypes";
import {CalendarContext} from "../../../Context/CalendarContext";
import {MedicationContext} from "../../../Context/MedicationContext";
import {dosagesOnSpecifiedDay} from "../../../Services/MedicationServices";
import {centeredTextStyle} from "../../../Styles";

const CalendarDay = (props: ICalendarDay & { isRenderedOnHomePage: boolean }) => {
        //region Context
        /**
         * Context from Calendar and Medication
         */
        const {setSelectedDay, selectedDay} = useContext(CalendarContext);
        const {userMedicationDosages, userMedications} = useContext(MedicationContext);
        //endregion

        /**
         * updates calendar context regarding what day is currently selected
         * and sets the context details to whatever the
         * selected days medicationDetails are
         */
        const handleOnDayClick = () => {
            setSelectedDay(props.date);

            // console.log(filteredFutureDosages)
        };


        //#region class testers for calendar day color
        const checkIsSelectedDay = () => {
            if (isSameDay(new Date(props.date), new Date(selectedDay))) {
                return true;
            } else {
                return false;
            }
        }
        const checkIsToday = () => {
            if (isSameDay(new Date(props.date), new Date())) {
                return true;
            } else {
                return false;
            }
        }

        const checkIsRefillDay = () => {
            let tempArray = userMedications.filter(medication => {
                if (isSameDay(new Date(props.date), new Date(medication.endDate))) {
                    return true;
                }
            })

            if (tempArray.length > 0) {
                return true;
            } else {
                return false;
            }
        }


        const checkIsMissedDay = () => {
            let tempArray = userMedicationDosages.filter(dosage => {
                if (dosage.hasBeenMissed && !dosage.hasBeenTaken && isSameDay(new Date(dosage.timeToTake), new Date(props.date))) {
                    return true;
                }
            })

            if (tempArray.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        //#endregion

        //#region class updaters for styles
        const selectedDayColor = () => {
            if (checkIsSelectedDay() && checkIsToday()) {
                return
            }
            if (checkIsSelectedDay()) {
                return ({
                    border: 3,
                    borderColor: 'text.secondary'
                })
            }
        }
        const isTodayStyling = () => {
            if (checkIsToday() && checkIsSelectedDay()) {
                return ({
                    border: 3,
                    borderColor: 'text.secondary',
                    borderRadius: '5px',
                    transform: 'translate(-2px,0px)'
                })
            }
            if (checkIsToday()) {
                return ({
                    border: 1,
                    borderColor: 'text.secondary',
                    borderRadius: '5px',
                    transform: 'translate(0px,2px)'
                })
            }
            return ({
                border: 3,
                borderColor: 'primary.dark',
                borderRadius: '5px',
            })
        }
        const alertStyling = () => {
            if (checkIsMissedDay()) {
                return ({
                    bgcolor: "missed.main",
                })
            }
            if (checkIsRefillDay()) {
                return ({
                    bgcolor: "refills.main",
                })
            }
        }
        //#endregion

        return (
            <Box sx={{display: 'flex', ...centeredTextStyle, width: '40px', height: '40px'}}>
                <Box sx={{...isTodayStyling(), ...centeredTextStyle, height: '37px', width: '37px'}}>
                    <IconButton
                        sx={{
                            padding: 0,
                            height: '37px',
                            width: '37px',
                            color: 'text.primary',
                            ...selectedDayColor(),
                            ...alertStyling(),
                            fontSize: '20px'
                        }}
                        onClick={() => {
                            handleOnDayClick();
                        }}
                    >
                        {getDate(props.date)}
                    </IconButton>
                </Box>
            </Box>
        );
    }
;

export default CalendarDay;
