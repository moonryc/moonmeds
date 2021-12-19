import React, {useContext, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {Divider, List, TextInput} from "react-native-paper";
import {MedicationContext} from "../../Context/MedicationContext";
import {makeMedication} from "../../typeConstructors";


const SelectedMedication = () => {

    const {userMedications, userMedicationDosages} = useContext(MedicationContext);

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(makeMedication());


    return (
        <ScrollView>

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

        </ScrollView>
    );
};

export default SelectedMedication;
