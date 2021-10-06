import React, {createContext, useState} from "react";

export interface ICalendarContextState {
    selectedDay:Date,
    setSelectedDay:(state:Date)=>void
}

export const CalendarContext = createContext<ICalendarContextState>({
    selectedDay:new Date(),
    setSelectedDay:(state:Date)=>{},
})

export const CalendarContainer = (props:any)=>{
    const {children} = props;
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    return(
        <CalendarContext.Provider value={{selectedDay,setSelectedDay}}>
            {children}
        </CalendarContext.Provider>
    )
}