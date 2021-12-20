import React, {useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {TextInput} from "react-native-paper";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {makeMedication} from "../../typeConstructors";

const EditMedication = () => {


    const [medicationObject, setMedicationObject] = useState<IMedicationBase>(makeMedication());

    return (
        <ScrollView>
            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Prescription Name"} value={medicationObject.prescriptionName} />



            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Notes"} value={medicationObject.userNotes} />
        </ScrollView>
    );
};

export default EditMedication;
