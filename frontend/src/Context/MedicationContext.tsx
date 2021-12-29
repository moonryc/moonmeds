import React, {createContext, useEffect, useState} from "react";
import { IMedicationDosagesBase } from "../../../Types/MedicationDosagesTypes";
import { IMedicationBase } from "../../../Types/MedicationTypes";
import {
    addDays, differenceInDays,
    endOfTomorrow,
    isBefore,
    isFriday,
    isMonday,
    isSaturday, isSunday,
    isThursday,
    isTuesday,
    isWednesday
} from "date-fns";

export interface IMedicationContextState {
  userMedications: IMedicationBase[] | [];
  setUserMedications: (state: IMedicationBase[] | []) => void;
  userMedicationDosages: IMedicationDosagesBase[] | [];
  setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => void;
}

export const MedicationContext = createContext<IMedicationContextState>({
  userMedications: [],
  setUserMedications: (state: IMedicationBase[] | []) => [],
  userMedicationDosages: [],
  setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => [],
});

export const MedicationContainer = (props: any) => {
  const { children } = props;
  const [userMedications, setUserMedications] = useState<
    IMedicationBase[] | []
  >([]);
  const [userMedicationDosages, setUserMedicationDosages] = useState<
    IMedicationDosagesBase[]
  >([]);

    const [todaysDosages, setTodaysDosages] = useState();


    useEffect(() => {
        let tempNewMedicationDosages=[]
        for (let medication of userMedications) {
            //we only care about the ones that are indefinite or before the enddate
            if (medication.inDefinite || isBefore(new Date(medication.endDate), new Date(endOfTomorrow()))) {

                //loop through dosages
                for (let dosage of medication.dosages) {

                    let {time: timeToTake, customWeekDays, ...rest} = dosage
                    //make the time to take for tomorrow actually tomorrow
                    
                    //TODO set time to take to today
                    // timeToTake

                    //create a temporary dosage
                    let tempDosage: IMedicationDosagesBase = {
                        friday: dosage.customWeekDays.friday,
                        monday: dosage.customWeekDays.monday,
                        saturday: dosage.customWeekDays.saturday,
                        sunday: dosage.customWeekDays.sunday,
                        thursday: dosage.customWeekDays.thursday,
                        tuesday: dosage.customWeekDays.tuesday,
                        wednesday: dosage.customWeekDays.wednesday,
                        amount: dosage.amount,
                        customOnceAMonthDate: dosage.customOnceAMonthDate,
                        hasBeenMissed: false,
                        hasBeenTaken: false,
                        isDaily: dosage.isDaily,
                        isOnceAMonth: dosage.isOnceAMonth,
                        isWeekly: dosage.isWeekly,
                        timeTaken: undefined,
                        timeToTake: timeToTake,
                        userId: medication.userId,
                        medicationId: medication.medicationId,
                        medicationOwner: {name:medication.medicationOwner.name, color:medication.medicationOwner.color},
                        nextFillDay: medication.nextFillDay,
                        endDate: medication.endDate,
                        inDefinite: medication.inDefinite,
                        prescriptionName: medication.prescriptionName,
                        dosageId: dosage.dosageIdentifier,
                    }



                    if (tempDosage.isDaily) {
                        tempNewMedicationDosages.push(tempDosage)
                    } else if (tempDosage.isWeekly) {
                        if (isMonday(timeToTake) && tempDosage.monday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isTuesday(timeToTake) && tempDosage.tuesday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isWednesday(timeToTake) && tempDosage.wednesday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isThursday(timeToTake) && tempDosage.thursday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isFriday(timeToTake) && tempDosage.friday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isSaturday(timeToTake) && tempDosage.saturday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                        if (isSunday(timeToTake) && tempDosage.sunday) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                    } else if (tempDosage.isOnceAMonth) {
                        if (differenceInDays(new Date(timeToTake), new Date(tempDosage.customOnceAMonthDate)) % 30 === 0) {
                            tempNewMedicationDosages.push(tempDosage)
                        }
                    } else {
                        console.log("-----------------------------------------------------")
                        console.log("error")
                        console.log(tempDosage)
                    }


                }

            }

        }
        setTodaysDosages(todaysDosages)
    }, [userMedications]);
    

    return (
    <MedicationContext.Provider
      value={{
        userMedications,
        setUserMedications,
        userMedicationDosages,
        setUserMedicationDosages,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};
