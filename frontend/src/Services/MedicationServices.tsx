import {getDate, getMonth, getYear, isEqual, isSameDay, parseISO} from "date-fns";
import {IMedicationDosagesSchema} from "../../../Types/MedicationType";

/**
 * Returns medication dosages pertaining to the selected date within the userMedicationDosages array
 * @param selectedISODate - desired date
 * @param userMedicationDosages - the users medication dosages
 * @return []|IMedicationDosagesSchema[]
 */
export const dosagesOnSpecifiedDay = (selectedISODate:Date,userMedicationDosages:[]|IMedicationDosagesSchema[]):[]|IMedicationDosagesSchema[] => {
    if (userMedicationDosages == null) {
        return []
    }


    let results = userMedicationDosages.filter(dosage => isSameDay(selectedISODate,new Date(dosage.time)))

    return results
}