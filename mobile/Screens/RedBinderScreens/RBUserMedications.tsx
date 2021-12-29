import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MedicationContext} from "../../Context/MedicationContext";
import {Button, Divider, MenuItem} from "@ui-kitten/components";
import {useNavigation, useRoute} from "@react-navigation/native";
import {StoreContext} from "../../Store/StoreContext";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {CommonStyles} from "../../Styles/CommonStyles";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";


const RBUserMedications = () => {

    //TODO FIX THIS SO THAT IT ONLY GETS THE MEDICATIONS RELATED TO THE USER
    const {sortedMedicationsByPerson} = useContext(MedicationContext);
    const {setSelectedMedication} = useContext(StoreContext);


    const navigation = useNavigation()
    const route = useRoute()


    const [arrayOfSelectedUserMedications, setArrayOfSelectedUserMedications] = useState<IMedicationBase[]|undefined>();

    useEffect(() => {

        // @ts-ignore
        setArrayOfSelectedUserMedications(sortedMedicationsByPerson.get(route.params.user))

    }, [sortedMedicationsByPerson,route]);



    return (
        <ScrollableLayout>

            <Button onPress={()=>{
                //@ts-ignore
                navigation.navigate("Create Medication", {headerName:"New Medication"})
            }}>Create New Medication</Button>

            {arrayOfSelectedUserMedications !== undefined ? arrayOfSelectedUserMedications.map((medication:IMedicationBase,index:number)=>{
                return(
                    <React.Fragment key={index}>
                        <MenuItem style={CommonStyles.listItem} title={medication.prescriptionName} onPress={()=>{
                            setSelectedMedication(medication)
                            //@ts-ignore
                            navigation.navigate("View Medication", {headerName:medication.prescriptionName})
                        }}/>
                        <Divider/>
                    </React.Fragment>
                )
            }):<View/>}
        </ScrollableLayout>
    );
};

export default RBUserMedications;
