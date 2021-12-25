import {useContext} from "react";
import {StoreContext} from "../Store/StoreContext";
import {IPersonNameAndColor} from "../../Types/UserTypes";
import {IMedicationBase} from "../../Types/MedicationTypes";


export const useGlobalMedication = ()=>{
    const {selectedMedication} = useContext(StoreContext)
    return selectedMedication
}

export const useSetGlobalMedication = (value:IMedicationBase)=>{
    const {setSelectedMedication} = useContext(StoreContext)
    setSelectedMedication(value)
}

export const useGlobalUser = ()=>{
    const {selectedUser} = useContext(StoreContext)
    return selectedUser
}

export const useSetGlobalUser = (value:IPersonNameAndColor)=>{
    const {setSelectedUser} = useContext(StoreContext)
    setSelectedUser(value)
}