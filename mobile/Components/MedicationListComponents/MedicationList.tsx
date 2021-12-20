import React, {useContext, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {Divider, List, TouchableRipple} from "react-native-paper";
import {MedicationContext} from "../../Context/MedicationContext";

const MedicationList = ({navigation,back}:any) => {

    const {userMedications, userMedicationDosages} = useContext(MedicationContext);
    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>();


    return (
        <ScrollView>
            {
                userMedications.map((medication: IMedicationBase,index:number) => {
                    return(
                        <View key={index}>
                            <TouchableRipple

                                onPress={() => console.log('Pressed')}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <List.Item
                                    title={medication.prescriptionName}
                                    description={medication.medicationOwner.name}
                                    onPress={()=>{
                                        setSelectedMedication({...medication})
                                        navigation.navigate('Details', {medicationObject:medication})
                                    }}
                                    left={props => <List.Icon {...props} icon="pill" color={medication.medicationOwner.color} />}
                                />
                            </TouchableRipple>
                            <Divider/>
                        </View>
                    )
                })
            }
        </ScrollView>
    );
};

export default MedicationList;
