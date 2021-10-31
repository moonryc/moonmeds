import { isSameDay } from "date-fns";
import { IMedicationDosagesBase } from "../../../Types/MedicationDosagesTypes";

/**
 * Returns medication dosages pertaining to the selected date within the userMedicationDosages array
 * @param selectedISODate - desired date
 * @param userMedicationDosages - the users medication dosages
 * @return []|IMedicationDosagesSchema[]
 */
export const dosagesOnSpecifiedDay = (
  selectedISODate: Date,
  userMedicationDosages: [] | IMedicationDosagesBase[]
): [] | IMedicationDosagesBase[] => {
  if (userMedicationDosages == null) {
    return [];
  }
  return userMedicationDosages.filter((dosage) =>
    isSameDay(selectedISODate, new Date(dosage.timeToTake))
  );
};
