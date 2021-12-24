import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {makeMedication} from "../../typeConstructors";
import MedicationNameAutoComplete from "../../Components/RedBinderComponents/NewMedication/MedicationNameAutoComplete";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
        height: "100%"
    },
})

const RBCreateMedication = () => {

    const [medicationObject, setMedicationObject] = useState(makeMedication);




    return (
        <ScrollView style={styles.container}>
            <MedicationNameAutoComplete/>
        </ScrollView>
    );
};

export default RBCreateMedication;
