import MedicationDosageModel from "../Schemas/MedicationDosageSchema";
import {format, formatDistance, formatRelative, subDays} from 'date-fns'
import DosageModel from "../Schemas/DosagesSchema";


const getKeys = (map: Map<string, any>) => {
    const iterator = map.keys()

    let userId = iterator.next().value;
    let arrayOfUserIds = [userId]

    while (userId !== undefined) {
        userId = iterator.next().value;
        if (userId !== undefined) {
            arrayOfUserIds.push(userId)

        }
    }
    return arrayOfUserIds
}

let map = new Map()

MedicationDosageModel.find((error, document) => {
    if (error) {
        console.log("This is an error")
        console.log(error)
    } else {
        // console.log(document)

        for (let item of document) {
            //if existing user
            if (map.has(item.userId)) {

                let user = map.get(item.userId)

                let day = format(item.timeToTake, "M/dd/yyyy")

                if (user.has(day)) {
                    user.set(day, [...user.get(day), item])
                } else {
                    user.set(day, [item])
                }

            }
            //if the user has not been added to the map yet
            else {
                //format day
                let day = format(item.timeToTake, "M/dd/yyyy")
                //add 2ndMap
                let secondMap = new Map()
                secondMap.set("userId", item.userId)
                secondMap.set(day, [item])

                map.set(item.userId, secondMap)
            }
        }

        console.log(map)

        if (true) {

            const arrayOfUserIds = getKeys(map)

            for (let userId of arrayOfUserIds) {

                const arrayOfDates = getKeys(map.get(userId))
                arrayOfDates.shift()

                for (let date of arrayOfDates) {

                    let dateData = map.get(userId).get(date)

                    let newObject =
                        {
                            userId: userId,
                            date: new Date(date),
                            dosages: dateData,
                        }


                    const newDateDosages = new DosageModel(newObject)

                    console.log("---------------------------------------------")
                    console.log(date)
                    console.log(newObject)
                    console.log("---------------------------------------------")

                    if (true) {
                        newDateDosages.save().catch(error => {
                            console.log(error)
                        })
                    }


                }
            }


        }
    }
})