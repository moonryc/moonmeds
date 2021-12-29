import MedicationModel from "../../Schemas/MedicationSchema";
import {
    addDays, differenceInDays,
    endOfTomorrow, format,
    isBefore,
    isFriday,
    isMonday,
    isSameDay, isSaturday, isSunday,
    isThursday,
    isTuesday,
    isWednesday, startOfTomorrow
} from 'date-fns'
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import DosageModel from "../../Schemas/DosagesSchema";
import {Types} from "mongoose";

export const createTomorrowsDosages = (userId: string) => {

    let dosagesToAdd: IMedicationDosagesBase[] = []

    MedicationModel.find({userId: userId}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            //loop through all medications
            for (let medication of doc) {
                //we only care about the ones that are indefinite or before the enddate
                if (medication.inDefinite || isBefore(new Date(medication.endDate), new Date(endOfTomorrow()))) {

                    //loop through dosages
                    for (let dosage of medication.dosages) {

                        let {time: timeToTake, customWeekDays, ...rest} = dosage
                        //make the time to take for tomorrow actually tomorrow
                        timeToTake = addDays(timeToTake, 1)

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
                            userId: userId,
                            medicationId: medication.medicationId,
                            medicationOwner: {name:medication.medicationOwner.name, color:medication.medicationOwner.color},
                            nextFillDay: medication.nextFillDay,
                            endDate: medication.endDate,
                            inDefinite: medication.inDefinite,
                            prescriptionName: medication.prescriptionName,
                            dosageId: dosage.dosageIdentifier,
                        }



                        if (tempDosage.isDaily) {
                            dosagesToAdd.push(tempDosage)
                        } else if (tempDosage.isWeekly) {
                            if (isMonday(timeToTake) && tempDosage.monday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isTuesday(timeToTake) && tempDosage.tuesday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isWednesday(timeToTake) && tempDosage.wednesday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isThursday(timeToTake) && tempDosage.thursday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isFriday(timeToTake) && tempDosage.friday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isSaturday(timeToTake) && tempDosage.saturday) {
                                dosagesToAdd.push(tempDosage)
                            }
                            if (isSunday(timeToTake) && tempDosage.sunday) {
                                dosagesToAdd.push(tempDosage)
                            }
                        } else if (tempDosage.isOnceAMonth) {
                            if (differenceInDays(new Date(timeToTake), new Date(tempDosage.customOnceAMonthDate)) % 30 === 0) {
                                dosagesToAdd.push(tempDosage)
                            }
                        } else {
                            console.log("-----------------------------------------------------")
                            console.log("error")
                            console.log(tempDosage)
                        }


                    }

                }

            }
                let object ={
                    date: new Date(format(startOfTomorrow(),"M/dd/yyyy")),
                    dosages: [...dosagesToAdd],
                    userId:userId,
                    _id:new Types.ObjectId().toString()
                }

                const newDosage = new DosageModel(object)

                newDosage.save().catch(error =>{
                    console.log(error)
                })

        }
    })

}

createTomorrowsDosages("61a2bea2c202894df7b94b86")