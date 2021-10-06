import React, {createContext, useState,} from 'react'
import {IMedicationDosagesSchema, IMedicationFrontEnd} from "../../../Types/MedicationType";


export interface IMedicationContextState {
    userMedications: IMedicationFrontEnd[] | []
    setUserMedications: (state: IMedicationFrontEnd[] | []) => void,
    userMedicationDosages: IMedicationDosagesSchema[] | null,
    setUserMedicationDosages: (state:IMedicationDosagesSchema[] | null)=>void,
}


export const MedicationContext = createContext<IMedicationContextState>({
    userMedications: [],
    setUserMedications: (state: IMedicationFrontEnd[] | []) => {},
    userMedicationDosages: null,
    setUserMedicationDosages: (state: IMedicationDosagesSchema[] | null) => {},

})

export const MedicationContainer = (props: any) => {
    const {children} = props;
    const [userMedications, setUserMedications] = useState<IMedicationFrontEnd[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesSchema[] | null>(null);



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