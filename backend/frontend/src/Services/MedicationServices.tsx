import {getDate, getMonth, getYear, isEqual, parseISO} from "date-fns";
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

    let date = new Date(getYear(selectedISODate), getMonth(selectedISODate), getDate(selectedISODate))
    let results = userMedicationDosages.filter(dosage => isEqual(date, new Date(
        getYear(parseISO(dosage.time.toString())),
        getMonth(parseISO(dosage.time.toString())),
        getDate(parseISO(dosage.time.toString())))))

    return results
}