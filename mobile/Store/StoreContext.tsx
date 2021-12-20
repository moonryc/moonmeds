import React, {createContext, useState} from 'react';
import {IMedicationBase} from "../../Types/MedicationTypes";
import {makeMedication} from "../typeConstructors";

interface IStoreContext {
    selectedMedication:IMedicationBase,
    setSelectedMedication:(state:IMedicationBase)=>void,
}

export const StoreContext = createContext<IStoreContext>({
    selectedMedication:makeMedication(),
    setSelectedMedication:(state:IMedicationBase)=>{}
})

// export const useBlah = (value) => {
//     const {setSelectedMedication } = useContext(StoreContext);
// }


const StoreContextContainer = (props:any) => {

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(makeMedication());




    return (
        <StoreContext.Provider value={{selectedMedication,setSelectedMedication}}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextContainer;
