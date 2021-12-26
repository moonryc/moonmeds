import {useContext} from "react";
import {StoreContext} from "../Store/StoreContext";
import {IPersonNameAndColor} from "../../Types/UserTypes";
import {IMedicationBase} from "../../Types/MedicationTypes";
import * as SecureStore from "expo-secure-store";


export const useGlobalMedication = ():{globalMedication:IMedicationBase,setGlobalMedication:(value:IMedicationBase)=>void}=>{
    const {selectedMedication:globalMedication,setSelectedMedication:setGlobalMedication} = useContext(StoreContext)
    return {globalMedication, setGlobalMedication}
}

export const useGlobalUser = ():{globalUser:IPersonNameAndColor,setGlobalUser:(value:IPersonNameAndColor)=>void}=>{
    const {selectedUser:globalUser,setSelectedUser:setGlobalUser} = useContext(StoreContext)
    return {globalUser, setGlobalUser}
}



