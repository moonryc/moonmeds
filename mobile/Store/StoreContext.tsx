import React, {createContext, useState} from 'react';
import {IMedicationBase} from "../../Types/MedicationTypes";
import {makeMedication, makePersonNameAndColor} from "../typeConstructors";
import {IPersonNameAndColor} from "../../Types/UserTypes";

interface IStoreContext {
    selectedMedication:IMedicationBase,
    setSelectedMedication:(state:IMedicationBase)=>void,
    selectedUser:IPersonNameAndColor,
    setSelectedUser:(personaAndColor:IPersonNameAndColor)=>void

}

export const StoreContext = createContext<IStoreContext>({
    selectedMedication:makeMedication(),
    setSelectedMedication:(state:IMedicationBase)=>{},
    selectedUser: makePersonNameAndColor(),
    setSelectedUser:(personAndColor:IPersonNameAndColor)=>{}
})

// export const useBlah = (value) => {
//     const {setSelectedMedication } = useContext(StoreContext);
// }


const StoreContextContainer = (props:any) => {

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(makeMedication());
    const [selectedUser, setSelectedUser] = useState<IPersonNameAndColor>(makePersonNameAndColor);


    return (
        <StoreContext.Provider value={{selectedMedication,setSelectedMedication,selectedUser,setSelectedUser}}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextContainer;
