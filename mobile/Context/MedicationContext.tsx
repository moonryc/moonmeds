import React, {createContext, useEffect, useState} from 'react';

import {Text, View} from 'react-native';
import {IMedicationBase} from "../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";
import medication from "../../routes/medication";
import {differenceInDays} from "date-fns";

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
})


const MedicationContextContainer = (props:any) => {

    const [userMedications, setUserMedications] = useState<IMedicationBase[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesBase[]>([]);
    const [upcomingRefill, setUpcomingRefill] = useState<IMedicationBase[]|[]>([]);
    const [takenDosages, setTakenDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [upcomingDosages, setUpcomingDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [missedDosages, setMissedDosages] = useState<IMedicationDosagesBase[]|undefined>();


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

    useEffect(() => {
        let tempUpcoming = userMedications.filter(medication=>{
            if(differenceInDays(new Date(),new Date(medication.nextFillDay))){
                return true
            }
        })
        setUpcomingRefill(tempUpcoming)
    }, [userMedications]);


    return (
        <MedicationContext.Provider value={{userMedications,setUserMedications,userMedicationDosages,setUserMedicationDosages, upcomingRefill,setUpcomingRefill,takenDosages,upcomingDosages,missedDosages}}>
            {props.children}
        </MedicationContext.Provider>
    );
};

export default MedicationContextContainer;
