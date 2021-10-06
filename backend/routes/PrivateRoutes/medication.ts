import express = require('express');
import passport = require('passport');
import mongoose = require("mongoose");
import {
    doesUserAlreadyHaveThisMedication,
    getUserMedicationByIdAndUpdate,
    getUserMedicationsArray,
    MedicationModel
} from "../../Schemas/medication";
import {IBackendResponse} from "../../Types/BackendResponseType";
import {IDosagesDetails, IMedicationDosagesSchema, IMedicationSchema} from "../../Types/MedicationType";
import {
    getUserMedicationsDosagesArray,
    MedicationDosagesModel,
    removeFutureDosages
} from "../../Schemas/medicationDosages";
import {
    add,
    addMonths,
    differenceInCalendarMonths, getDate,
    getDay,
    getMinutes, getMonth, getYear,
    isBefore,
    parseISO,
    setDate,
    setMinutes, setMonth, setYear
} from "date-fns";

const medicationRouter = express.Router();


const jwtRequired = passport.authenticate('jwt', {session: false});


const addNewDosages = async (medicationObject: IMedicationSchema,userId:string) => {
    let currentTime: Date = new Date()
    currentTime = parseISO(currentTime.toISOString())

    let medicationDosage = {
        userId: "",
        _id: "",
        medication_id: "",
        prescriptionName: "",
        hasBeenTaken: false,
        isLateToTakeMedication: false,
        nextFillDay: new Date(),
        amount: 0,
        time: new Date(),
        isDaily: false,
        isWeekly: false,
        isMonthly: false,
        selectedMonthly: new Date(),
        isCustom: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    }

    let {_id: medication_id, prescriptionName, nextFillDay, dosages} = medicationObject
    let loopDosage: IDosagesDetails[] = dosages

    nextFillDay = parseISO(nextFillDay.toString())

    medicationDosage.userId = userId
    medicationDosage.medication_id = medication_id
    medicationDosage.prescriptionName = prescriptionName
    medicationDosage.nextFillDay = nextFillDay
    medicationDosage.hasBeenTaken = false
    medicationDosage.isLateToTakeMedication = false

    for (let index = 0; index < loopDosage.length; index++) {

        let {
            amount,
            time: dayAndTimeOfDosage,
            isDaily,
            isWeekly,
            isMonthly,
            selectedMonthly,
            isCustom,
            customDays
        } = loopDosage[index]

        let {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = customDays
        dayAndTimeOfDosage = parseISO(dayAndTimeOfDosage.toString())

        medicationDosage.amount = amount
        medicationDosage.isDaily = isDaily
        medicationDosage.isWeekly = isWeekly
        medicationDosage.isMonthly = isMonthly
        medicationDosage.selectedMonthly = selectedMonthly
        medicationDosage.isCustom = isCustom


        //sets the time to the day/month/year of the day of the month input
        if (isMonthly) {
            let day = getDate(parseISO(selectedMonthly.toString()))
            let month = getMonth(parseISO(selectedMonthly.toString()))
            let year = getYear(parseISO(selectedMonthly.toString()))

            dayAndTimeOfDosage = setYear(dayAndTimeOfDosage, year)
            dayAndTimeOfDosage = setMonth(dayAndTimeOfDosage, month)
            dayAndTimeOfDosage = setDate(dayAndTimeOfDosage, day)
        }

        //iterates over a single dosage
        while (isBefore(dayAndTimeOfDosage, nextFillDay)) {

            let addDosageToDay: boolean = false
            let dayOfTheWeek = getDay(dayAndTimeOfDosage)

            if (isDaily) {
                addDosageToDay = true;

            } else if (isWeekly) {

                switch (dayOfTheWeek) {
                    case 0:
                        if (sunday) {
                            addDosageToDay = true;
                            medicationDosage.sunday = sunday
                        }
                        break;
                    case 1:
                        if (monday) {
                            console.log(isWeekly)
                            addDosageToDay = true;
                            medicationDosage.monday = monday
                        }
                        break;
                    case 2:
                        if (tuesday) {
                            addDosageToDay = true;
                            medicationDosage.tuesday = tuesday
                        }
                        break;
                    case 3:
                        if (wednesday) {
                            addDosageToDay = true;
                            medicationDosage.wednesday = wednesday
                        }
                        break;
                    case 4:
                        if (thursday) {
                            addDosageToDay = true;
                            medicationDosage.thursday = thursday
                        }
                        break;
                    case 5:
                        if (friday) {
                            medicationDosage.friday = friday
                            addDosageToDay = true;
                        }
                        break;
                    case 6:
                        if (saturday) {
                            addDosageToDay = true;
                            medicationDosage.saturday = saturday
                        }
                        break;
                }

            } else if (isMonthly) {
                addDosageToDay = true
            }


            if (addDosageToDay) {
                medicationDosage._id = new mongoose.Types.ObjectId().toString()
                medicationDosage.time = dayAndTimeOfDosage
                const medicationDosageReminder:IMedicationDosagesSchema = new MedicationDosagesModel(medicationDosage)
                console.log("attempting to create")
                await medicationDosageReminder.save();
            }

            if (isDaily) {
                dayAndTimeOfDosage = add(dayAndTimeOfDosage, {days: 1})
            } else if (isWeekly) {
                dayAndTimeOfDosage = add(dayAndTimeOfDosage, {days: 1})
            } else if (isMonthly) {
                dayAndTimeOfDosage = add(dayAndTimeOfDosage, {months: 1})
            }



        }
    }
}


//get list of users medication
medicationRouter.get('/userMedications', jwtRequired, (req, res) => {

    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.errorMessage = "Error in authenticating user";
            return res.send(response)
        } else {

            try {
                const userMedications: IMedicationSchema[] = await getUserMedicationsArray(user.userId)
                response.error = false
                response.errorMessage = ''
                response.response = userMedications
                return res.send(response)
            } catch (e) {
                console.log(e)
                response.error = true
                response.errorMessage = "error message is located in the response under errorMessage"
                response.response = {errorMessage: e}
                return res.send(response)
            }
        }
    })(req, res)
});

//Get list of doses based off of logged in user
medicationRouter.get('/userMedicationsDosages', jwtRequired, (req, res) => {

    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.errorMessage = "Error in authenticating user";
            return res.send(response)
        } else {
            try {
                const userMedications: IMedicationDosagesSchema[] = await getUserMedicationsDosagesArray(user.userId)
                response.error = false
                response.errorMessage = ''
                response.response = userMedications
                return res.send(response)
            } catch (e) {
                console.log(e)
                response.error = true
                response.errorMessage = "error message is located in the response under errorMessage"
                response.response = {errorMessage: e}
                return res.send(response)
            }
        }
    })(req, res)
});

//add new medication
medicationRouter.post('/addnewmedication', jwtRequired, (req, res) => {
    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }

    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            response.error = true;
            response.errorMessage = "Error in authenticating user";
            return res.send(response)

        } else {
            if (await doesUserAlreadyHaveThisMedication(user.userId, req.body)) {
                response.error = true;
                response.errorMessage = "Medication already exits";
                return res.send(response)
            } else {

                //add in the new randomly generated _id and the userId
                req.body.userId = user.userId
                req.body._id = new mongoose.Types.ObjectId().toString()

                let newMedication: IMedicationSchema = req.body
                const medication = new MedicationModel(newMedication)

                await medication.save();

                await addNewDosages(newMedication,user.userId)

                response.error = false;
                response.errorMessage = "";
                response.response = {}
                return res.send(response)
            }
        }
    })(req, res)
});

//update medication
//add new medication
medicationRouter.put('/updatemedication', jwtRequired, (req, res) => {
    console.log(req.body)
    let response: IBackendResponse = {
        error: false,
        errorMessage: "",
        response: {}
    }
    passport.authenticate('jwt', {session: false}, async (err, user) => {
        //if error
        if (err || !user) {
            console.log("error:" + err)
            return res.send(err)
        } else {

            let medication: IMedicationSchema = req.body
            let update: string | boolean = await getUserMedicationByIdAndUpdate(req.body._id, medication)
            removeFutureDosages(user.userId, medication._id)
            addNewDosages(medication,user.userId)
            if (update) {

                response.error = true
                if (typeof update === "string") {
                    response.errorMessage = update
                }
                return res.send(response)
            } else {
                return res.send(response)
            }
        }
    })(req, res)
    // return res.send(userReturnObject);
});


export default medicationRouter;