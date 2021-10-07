import React, {createContext, useState,} from 'react'
import {IMedicationDosagesSchema, IMedicationFrontEnd} from "../../../Types/MedicationType";


export interface IMedicationContextState {
    userMedications: IMedicationFrontEnd[] | []
    setUserMedications: (state: IMedicationFrontEnd[] | []) => void,
    userMedicationDosages: IMedicationDosagesSchema[] | [],
    setUserMedicationDosages: (state:IMedicationDosagesSchema[] |[])=>void,
    updateBar:boolean
    setUpdateBar:(state:boolean)=>void
}


export const MedicationContext = createContext<IMedicationContextState>({
    userMedications: [],
    setUserMedications: (state: IMedicationFrontEnd[] | []) => [],
    userMedicationDosages: [],
    setUserMedicationDosages: (state: IMedicationDosagesSchema[] |[]) => [],
    updateBar:false,
    setUpdateBar:(state:boolean)=>{}

})

export const MedicationContainer = (props: any) => {
    const {children} = props;
    const [userMedications, setUserMedications] = useState<IMedicationFrontEnd[] | []>([]);
    const [userMedicationDosages, setUserMedicationDosages] = useState<IMedicationDosagesSchema[]>([]);
    const [updateBar, setUpdateBar] = useState(false);


    return (
        <MedicationContext.Provider value={{
            userMedications,
            setUserMedications,
            userMedicationDosages,
            setUserMedicationDosages,
            updateBar,
            setUpdateBar

        }}>
            {children}
        </MedicationContext.Provider>
    )
}