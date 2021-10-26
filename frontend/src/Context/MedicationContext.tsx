import React, {createContext, useState,} from 'react'
import {IMedicationDosagesBase } from "../../../Types/MedicationDosagesTypes";
import { IMedicationBase} from "../../../Types/MedicationTypes";


export interface IMedicationContextState {
    userMedications: IMedicationBase[] | []
    setUserMedications: (state: IMedicationBase[] | []) => void,
    userMedicationDosages: IMedicationDosagesBase[] | [],
    setUserMedicationDosages: (state:IMedicationDosagesBase[] |[])=>void,

}


export const MedicationContext = createContext<IMedicationContextState>({
    userMedications: [],
    setUserMedications: (state: IMedicationBase[] | []) => [],
    userMedicationDosages: [],
    setUserMedicationDosages: (state: IMedicationDosagesBase[] |[]) => [],


})

export const MedicationContainer = (props: any) => {
    const {children} = props;
    const [userMedications, setUserMedications] = useState<IMedicationBase[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesBase[]>([]);


    return (
        <MedicationContext.Provider value={{
            userMedications,
            setUserMedications,
            userMedicationDosages,
            setUserMedicationDosages,

        }}>
            {children}
        </MedicationContext.Provider>
    )
}