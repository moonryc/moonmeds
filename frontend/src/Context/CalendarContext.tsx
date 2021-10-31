import React, { createContext, useContext, useEffect, useState } from "react";
import { IMedicationDosagesBase } from "../../../Types/MedicationDosagesTypes";
import { dosagesOnSpecifiedDay } from "../Services/MedicationServices";
import { MedicationContext } from "./MedicationContext";

export interface ICalendarContextState {
  selectedDay: Date;
  setSelectedDay: (state: Date) => void;
  selectedDayDetails: IMedicationDosagesBase[];
}

export const CalendarContext = createContext<ICalendarContextState>({
  selectedDay: new Date(),
  setSelectedDay: (state: Date) => { },
  selectedDayDetails: [],
});

export const CalendarContainer = (props: any) => {
  const { children } = props;
  const { userMedicationDosages } = useContext(MedicationContext);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedDayDetails, setSelectedDayDetails] = useState<
    IMedicationDosagesBase[] | []
  >([]);

  useEffect(() => {
    setSelectedDayDetails(
      dosagesOnSpecifiedDay(selectedDay, userMedicationDosages)
    );
  }, [selectedDay, userMedicationDosages]);

  return (
    <CalendarContext.Provider
      value={{ selectedDay, setSelectedDay, selectedDayDetails }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
