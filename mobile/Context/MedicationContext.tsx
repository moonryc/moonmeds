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
}

export const MedicationContext = createContext<IMedicationContext>({
    userMedications: [],
    setUserMedications: (state: IMedicationBase[] | []) => [],
    userMedicationDosages: [],
    setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => [],
    upcomingRefill: [],
    setUpcomingRefill: (state: IMedicationBase[] | []) => [],
})


const MedicationContextContainer = (props:any) => {

    const [userMedications, setUserMedications] = useState<IMedicationBase[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesBase[]>([]);

    const [upcomingRefill, setUpcomingRefill] = useState<IMedicationBase[]|[]>([]);

    useEffect(() => {
        let tempUpcoming = userMedications.filter(medication=>{
            if(differenceInDays(new Date(),new Date(medication.nextFillDay))){
                return true
            }
        })
        setUpcomingRefill(tempUpcoming)
    }, [userMedications]);


    return (
        <MedicationContext.Provider value={{userMedications,setUserMedications,userMedicationDosages,setUserMedicationDosages, upcomingRefill,setUpcomingRefill}}>
            {props.children}
        </MedicationContext.Provider>
    );
};

export default MedicationContextContainer;
