import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {Divider, List, TextInput} from "react-native-paper";
import {MedicationContext} from "../../Context/MedicationContext";
import {makeMedication} from "../../typeConstructors";


const SelectedMedication = ({route}:any) => {

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(route.params.medicationObject);


    useEffect(()=>{
        setSelectedMedication(route.params.medicationObject)
    },[route.params.medicationObject])

console.log(route.params.medicationObject)


    return (
        <ScrollView>
            {selectedMedication === undefined ? <View/>:
                <View>
            <Text>
                Prescription Name: {selectedMedication.prescriptionName}
            </Text>

            <Text>
                Medication Owner: {selectedMedication.medicationOwner.name}
            </Text>

            <Text>
                Prescription Dosage: {selectedMedication.prescriptionDosage}
            </Text>

            <Text>
                Next Refill: {selectedMedication.nextFillDay.toString()}
            </Text>

            <Text>
                Notes: {selectedMedication.userNotes}
            </Text>
                </View>
            }

        </ScrollView>
    );
};

export default SelectedMedication;
