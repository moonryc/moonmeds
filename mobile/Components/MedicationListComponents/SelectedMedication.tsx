import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {Avatar, Chip, Surface} from "react-native-paper";
import { StyleSheet } from 'react-native';

const surface = StyleSheet.create({
    surface: {
        // padding: 30,

        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 4,
    },
});

const styles = StyleSheet.create({
    surface: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:"left"

    },
});

const SelectedMedication = ({route}:any) => {

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(route.params.medicationObject);


    useEffect(()=>{
        setSelectedMedication(route.params.medicationObject)
    },[route.params.medicationObject])



    return (
        <ScrollView contentContainerStyle={styles.surface}>

            <Surface style={{borderRadius:15,...surface.surface}}>

                <Text>
                    Prescription Name: {selectedMedication.prescriptionName}
                </Text>


                    <Avatar.Icon size={24} icon="face" style={{flex:1}}/>
                    <Text style={{flex:1}}>{selectedMedication.medicationOwner.name}</Text>





                <Text>
                    Prescription Dosage: {selectedMedication.prescriptionDosage}
                </Text>

                <Text>
                    Next Refill: {selectedMedication.nextFillDay.toString()}
                </Text>

            </Surface>


            <Surface style={{borderRadius:15,...surface.surface}}>

                <Text>
                    Notes: {selectedMedication.userNotes}
                </Text>

            </Surface>



        </ScrollView>
    );
};

export default SelectedMedication;
