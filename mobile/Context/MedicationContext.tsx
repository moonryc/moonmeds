import React, {createContext, useState} from 'react';

import {Text, View} from 'react-native';
import {IMedicationBase} from "../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../Types/MedicationDosagesTypes";

interface IMedicationContext {
    userMedications: IMedicationBase[] | [];
    setUserMedications: (state: IMedicationBase[] | []) => void;
    userMedicationDosages: IMedicationDosagesBase[] | [];
    setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => void;
}

export const MedicationContext = createContext<IMedicationContext>({
    userMedications: [],
    setUserMedications: (state: IMedicationBase[] | []) => [],
    userMedicationDosages: [],
    setUserMedicationDosages: (state: IMedicationDosagesBase[] | []) => [],
})


const MedicationContextContainer = (props:any) => {

    const [userMedications, setUserMedications] = useState<IMedicationBase[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesBase[]>([]);


    return (
        <MedicationContext.Provider value={{userMedications,setUserMedications,userMedicationDosages,setUserMedicationDosages}}>
            {props.children}
        </MedicationContext.Provider>
    );
};

export default MedicationContextContainer;
