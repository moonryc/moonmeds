import { Box, IconButton } from "@mui/material";
import {
  differenceInDays,
  getDate, isAfter, isBefore, isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday
} from "date-fns";
import isSameDay from "date-fns/isSameDay";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ICalendarDay
} from "../../../../../Types/CalendarType";
import { IMedicationDosagesBase } from "../../../../../Types/MedicationDosagesTypes";
import { CalendarContext } from "../../../Context/CalendarContext";
import { MedicationContext } from "../../../Context/MedicationContext";
import { dosagesOnSpecifiedDay } from "../../../Services/MedicationServices";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";

const CalendarDay = (props: ICalendarDay & { isRenderedOnHomePage: boolean }) => {
  //region Context
  /**
   * Context from Calendar and Medication
   */
  const { setSelectedDay, selectedDay } = useContext(CalendarContext);
  const { userMedicationDosages, userMedications } = useContext(MedicationContext);
  //endregion

  /**
   * the medication dosages associated with this day in particular
   * TODO: This is to be used for styling
   *
   */
  const [medicationDosagesDetails, setMedicationDosagesDetails] = useState<IMedicationDosagesBase[] | []>(dosagesOnSpecifiedDay(props.date, userMedicationDosages));
  const [calendarDayColor, setCalendarDayColor] = useState({
    bgcolor: "primary.main",
    width: ['40px'],
    height: ['40px'],
    color: "#000000",
    border: 0,
    borderRadius: "50%",
    borderColor: "primary.main",
  });

  /**
   * updates calendar context regarding what day is currently selected
   * and sets the context details to whatever the
   * selected days medicationDetails are
   */
  const handleOnDayClick = () => {
    setSelectedDay(props.date);
    console.log(medicationDosagesDetails);
    // console.log(filteredFutureDosages)
  };

  const isToday = useCallback((): boolean => {
    return isSameDay(new Date(props.date), new Date());
  }, [props.date]);

  const isFillDay = useCallback((): any => {
    if (medicationDosagesDetails != null) {
      for (let i in medicationDosagesDetails) {
        //@ts-ignore
        if (
          isSameDay(
            new Date(medicationDosagesDetails[i].nextFillDay),
            new Date(props.date)
          )
        ) {
          return true;
        }
        //ts-ignore
        console.log(medicationDosagesDetails[0].nextFillDay);
      }
    }
    // console.log(new Date(props.date))
    return false;
  }, [medicationDosagesDetails, props.date]);

  const isMissedDate = useCallback((): any => {
    if (medicationDosagesDetails != null) {
      for (let i in medicationDosagesDetails) {
        if (medicationDosagesDetails[i].hasBeenMissed) {
          return true;
        }
      }
    }
    return false;
  }, [medicationDosagesDetails]);

  const cssClassUpdater = useCallback(() => {
    let isItToday = isToday();
    let isDayAFillday = isFillDay();
    let isMissed = isMissedDate();

    if (isItToday) {
      setCalendarDayColor({
        bgcolor: "primary.main",
        border: 1,
        width: ['40px'],
        height: ['40px'],
        borderRadius: "50%",
        color: "text.primary",
        borderColor: "primary.light",
      });
      return;
    }

    if (isMissed) {
      setCalendarDayColor({
        bgcolor: "primary.main",
        width: ['40px'],
        height: ['40px'],
        color: "missed.main",
        border: 0,
        borderRadius: "50%",
        borderColor: "primary.main",
      });
      return;
    }

    if (isDayAFillday) {
      setCalendarDayColor({
        bgcolor: "primary.main",
        width: ['40px'],
        height: ['40px'],
        color: "refills.main",
        border: 0,
        borderRadius: "50%",
        borderColor: "primary.main",
      });
      return;
    }

    // setCalendarDayColor({
    //   bgcolor: "primary.main",
    //   width: ['40px'],
    //   height: ['40px'],
    //   color: "text.primary",
    //   border: 0,
    //   borderRadius: "50%",
    //   borderColor: "primary.main",
    // });
  }, [isFillDay, isMissedDate, isToday]);


  const [filteredFutureDosages, setFilteredFutureDosages] = useState<IMedicationDosagesBase[]>([]);

  const updateFilteredFutureDosages = () => {
    //filters out medications that arnt going to be taken on that date due to not being indefinite or stops taking medicaiton before that date
    let arrayOfValidFutureMedication: IMedicationBase[] = userMedications.filter((medication) => {
      return isBefore(medication.endDate, new Date(props.date)) || medication.inDefinite;
    })

    let arrayOfValidDosages: IMedicationDosagesBase[] = []

    for (let medication of arrayOfValidFutureMedication) {
      for (let dosage of medication.dosages) {
        let {time, customWeekDays} = dosage
        let tempDosage: IMedicationDosagesBase = {
          ...customWeekDays,
          userId: medication.userId,
          medicationId: medication.medicationId,
          dosageId: "",
          prescriptionName: medication.prescriptionName,
          nextFillDay: medication.nextFillDay,
          endDate: medication.endDate,
          inDefinite: medication.inDefinite,
          amount: dosage.amount,
          medicationOwner: medication.medicationOwner,
          timeToTake: time,
          isDaily: dosage.isDaily,
          isWeekly: dosage.isWeekly,
          isOnceAMonth: dosage.isOnceAMonth,
          customOnceAMonthDate: dosage.customOnceAMonthDate,
          hasBeenTaken: false,
          hasBeenMissed: false,
          timeTaken: false
        }


        if (dosage.isDaily) {
          arrayOfValidDosages.push(tempDosage)
        } else if (dosage.isWeekly) {
          let selectedDate = new Date(props.date)
          if (dosage.customWeekDays.monday && isMonday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.tuesday && isTuesday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.wednesday && isWednesday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.thursday && isThursday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.friday && isFriday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.saturday && isSaturday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }
          if (dosage.customWeekDays.sunday && isSunday(selectedDate)) {
            arrayOfValidDosages.push(tempDosage)
          }

        } else if (dosage.isOnceAMonth) {
          //TODO more research about the number of days
          if (differenceInDays(dosage.customOnceAMonthDate, new Date(props.date)) % 30 === 0) {
            arrayOfValidDosages.push(tempDosage)
          }
        }
      }
    }

    console.log(arrayOfValidDosages)
    if(isAfter(props.date, new Date())){

    setMedicationDosagesDetails([...arrayOfValidDosages])
    }
  }
  
  /**
   * tests if the componet represents today
   * @return boolean - true if it is today, false otherwise
   */

  const isSelectedDay = isSameDay(new Date(props.date), new Date(selectedDay))
    ? { bgcolor: "primary.light" }
    : {};

  /**
   * updates the local variable medicationDosageDetails when dosages change
   */
  useEffect(() => {
    // let answer = getDatesUserMedication()
    if(!isAfter(props.date, new Date())){
      setMedicationDosagesDetails(
          dosagesOnSpecifiedDay(props.date, userMedicationDosages)
      );
    }
    updateFilteredFutureDosages()
    cssClassUpdater();
  }, [userMedicationDosages, props.date,userMedications]);

  useEffect(() => {

  }, [cssClassUpdater]);

  return (
    <Box>
      {/*if(props.date===today) color= cyan*/}
      {/*if(props.date===any fill date coming up) color= yellow*/}
      {/*if(props.date===any dose coming up) color= yellow*/}
      {/*if(props.date===missed dose) color=red*/}
      {/*else color=theme.text.primary*/}
      {/*@ts-ignore*/}
      <IconButton
        sx={{
          ...calendarDayColor,
          ...isSelectedDay,
          fontSize: ['20px'],
        }}
        onClick={() => {handleOnDayClick();console.log(isMissedDate())}}
      >
        {getDate(props.date)}
      </IconButton>
    </Box>
  );
};

export default CalendarDay;
