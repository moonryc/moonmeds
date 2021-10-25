import React, {useEffect, useState} from 'react';
import FormInput from "../Misc/FormInput";

const QuickRefill = () => {


    //TODO: get the existing number of remaining dosage for the specified medication
    const [remainingDosages, setRemainingDosages] = useState(null);

    const [isQuickRefillActive, setIsQuickRefillActive] = useState(false);
    const [quickRefillText, setQuickRefillText] = useState("Quick Refill");
    const [additionalDosages, setAdditionalDosages] = useState(0);

    const handleDosageCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalDosages(parseInt(e.target.value));
    }

    const enableDisableQuickRefill=()=>{
        setIsQuickRefillActive(!isQuickRefillActive)
    }

    useEffect(()=>{
        if(isQuickRefillActive){
            setQuickRefillText("X")
        }else{
            setQuickRefillText("Quick Refill")
        }
    },[isQuickRefillActive])

    //TODO: Create a function so that when submitting the fill button the medication is updated
    

    return (
        <div>
            <button onClick={enableDisableQuickRefill}>{quickRefillText}</button>
            {isQuickRefillActive ?<> <FormInput onChange={handleDosageCallBack}/> <button>Fill</button> </>:<></>}
        </div>
    );
};

export default QuickRefill;
