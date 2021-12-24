import React, {useContext} from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MedicationContext} from "../../Context/MedicationContext";
import {Button, Divider, MenuItem} from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
        height: "100%"
    },
    item:{
        minHeight:75,
    }
})

const RBUserMedications = () => {

    //TODO FIX THIS SO THAT IT ONLY GETS THE MEDICATIONS RELATED TO THE USER
    const {userMedications} = useContext(MedicationContext);

    const navigation = useNavigation()

    return (
        <ScrollView style={styles.container}>

            <Button onPress={()=>{
                //@ts-ignore
                navigation.navigate("Create Medication", {headerName:"New Medication"})
            }}>Create New Medication</Button>
            {userMedications.map((medication,index)=>{
                return(
                    <React.Fragment key={index}>
                        <MenuItem style={styles.item} title={medication.prescriptionName}/>
                        <Divider/>
                    </React.Fragment>
                )
            })}
        </ScrollView>
    );
};

export default RBUserMedications;
