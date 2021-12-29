import React, {createContext, useEffect, useState} from 'react';

import {Text, View} from 'react-native';
import {IMedicationBase} from "../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import medication from "../../routes/medication";
import {differenceInDays} from "date-fns";
import {IPersonNameAndColor} from "../../Types/UserTypes";
import {useQuery} from "react-query";
import * as SecureStore from "expo-secure-store";

interface IMedicationContext {
    userMedications: IMedicationBase[] | [];
    setUserMedications: (state: IMedicationBase[] | []) => void;
    userMedicationDosages: IMedicationDosagesBase[] | [];
    setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => void;
    upcomingRefill: IMedicationBase[],
    setUpcomingRefill: (state: IMedicationBase[] | []) => void,
    takenDosages:IMedicationDosagesBase[]|undefined,
    upcomingDosages:IMedicationDosagesBase[]|undefined,
    missedDosages:IMedicationDosagesBase[]|undefined,
    sortedMedicationsByPerson:Map<string,IMedicationBase>|undefined
}

export const MedicationContext = createContext<IMedicationContext>({
    userMedications: [],
    setUserMedications: (state: IMedicationBase[] | []) => [],
    userMedicationDosages: [],
    setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => [],
    upcomingRefill: [],
    setUpcomingRefill: (state: IMedicationBase[] | []) => [],
    takenDosages:undefined,
    upcomingDosages:undefined,
    missedDosages:undefined,
    sortedMedicationsByPerson:undefined,
})


const MedicationContextContainer = (props:any) => {

    const [userMedications, setUserMedications] = useState<IMedicationBase[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesBase[]>([]);


    /**
     * For the calendar
     */
    const [upcomingRefill, setUpcomingRefill] = useState<IMedicationBase[]|[]>([]);
    const [takenDosages, setTakenDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [upcomingDosages, setUpcomingDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [missedDosages, setMissedDosages] = useState<IMedicationDosagesBase[]|undefined>();

    /**
     * Todays dosages
     */
    const [todaysDosages,setTodaysDosages] = useState<any>()


    const {refetch:getTodaysDosage, data} = useQuery("getTodayDosages",()=>{
        console.log("getting Todays Dosages")
        SecureStore.getItemAsync("moonmeds-JWT").then(authKey => {
            if (authKey) {
                fetch('https://moonmeds.herokuapp.com/medicationDosages/medicationDosageDateRange', {
                    method: "PUT", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: authKey,
                    },
                    body:JSON.stringify({startDate:new Date().toString(),endDate:new Date().toString()})
                }).then(response=>response.json)
            }})
    })

    useEffect(() => {
        console.log(data)
            setTodaysDosages(data)
    }, [data]);


    /**
     * A Map where the keys are the persons and the value is an array of the persons medications
     */
    const [sortedMedicationsByPerson, setSortedMedicationsByPerson] = useState<Map<string, IMedicationBase>|undefined>();

    useEffect(() => {

        let map = new Map()

        for(let medication of userMedications){

            if(!map.has(medication.medicationOwner.name)){
                map.set(medication.medicationOwner.name,[medication])
            }else{
                map.set(medication.medicationOwner.name,[...map.get(medication.medicationOwner.name),medication])
            }
        }

        setSortedMedicationsByPerson(map)
        getTodaysDosage().then(r=>r)
    }, [userMedications]);



    /**
     * Updates the takenDosages, upcoming Dosages, and missed dosages
     */
    useEffect(() => {
        let tempTaken:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (dosage.hasBeenTaken) {
                return true
            }
        })
        if(tempTaken?.length<1){
            tempTaken = undefined
        }
        let tempUpcoming:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (!dosage.hasBeenTaken && !dosage.hasBeenMissed) {
                return true
            }
        })
        if(tempUpcoming?.length<1){
            tempUpcoming = undefined
        }

        let tempMissed:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (!dosage.hasBeenTaken && dosage.hasBeenMissed) {
                return true
            }
        })
        if(tempMissed?.length<1){
            tempUpcoming = undefined
        }


        setTakenDosages(tempTaken)
        setUpcomingDosages(tempUpcoming)
        setMissedDosages(tempMissed)
    }, [userMedicationDosages])

    /**
     * Updates the upcoming refill
     */
    useEffect(() => {
        let tempUpcoming = userMedications.filter(medication=>{
            if(differenceInDays(new Date(),new Date(medication.nextFillDay))){
                return true
            }
        })
        setUpcomingRefill(tempUpcoming)
    }, [userMedications]);


    return (
        <MedicationContext.Provider value={{userMedications,setUserMedications,userMedicationDosages,setUserMedicationDosages, upcomingRefill,setUpcomingRefill,takenDosages,upcomingDosages,missedDosages, sortedMedicationsByPerson}}>
            {props.children}
        </MedicationContext.Provider>
    );
};

export default MedicationContextContainer;
