import React, {createContext, useContext, useEffect, useState} from "react";
import {IMedicationDosagesSchema} from "../../../Types/MedicationType";
import {dosagesOnSpecifiedDay} from "../Services/MedicationServices";
import {MedicationContext} from "./MedicationContext";

export interface ICalendarContextState {
    selectedDay:Date,
    setSelectedDay:(state:Date)=>void
    selectedDayDetails:IMedicationDosagesSchema[]
    setSelectedDayDetails:(state:IMedicationDosagesSchema[]|[])=>void
}

export const CalendarContext = createContext<ICalendarContextState>({
    selectedDay:new Date(),
    setSelectedDay:(state:Date)=>{},
    selectedDayDetails:[],
    setSelectedDayDetails:(state:IMedicationDosagesSchema[]|[])=>{}
})

export const CalendarContainer = (props:any)=>{
    const {children} = props;
    const {userMedicationDosages} = useContext(MedicationContext);
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedDayDetails, setSelectedDayDetails] = useState<IMedicationDosagesSchema[]|[]>([]);

    useEffect(() => {
        setSelectedDayDetails(dosagesOnSpecifiedDay(selectedDay,userMedicationDosages))
    }, [selectedDay,userMedicationDosages]);


    return(
        <CalendarContext.Provider value={{selectedDay,setSelectedDay,selectedDayDetails,setSelectedDayDetails}}>
            {children}
        </CalendarContext.Provider>
    )
}