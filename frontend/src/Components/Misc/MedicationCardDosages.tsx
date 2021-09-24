import React, {useState} from 'react';
import FormInput from "./FormInput";

const MedicationCardDosages = () => {


    //TODO(Moon): Travis I may need help... maybe?
    const [dosageArray, setDosageArray] = useState([]);

    const newDosage = () => {
        const tempArray = dosageArray
        // @ts-ignore
        tempArray[1]= <FormInput/>

        setDosageArray(tempArray)
    }


    return (
        <div>
            <button>Add a dosage</button>
        </div>
    );
};

export default MedicationCardDosages;
