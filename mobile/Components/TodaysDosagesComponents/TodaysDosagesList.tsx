import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {Divider, List, TouchableRipple} from "react-native-paper";
import {MedicationContext} from "../../Context/MedicationContext";
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import isToday from 'date-fns/isToday'

const TodaysDosagesList = () => {

    const {userMedications, userMedicationDosages} = useContext(MedicationContext);
    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>();

    const [missedDosagesArray, setMissedDosagesArray] = useState<IMedicationDosagesBase[]>();
    const [upcomingDosagesArray, setUpcomingDosagesArray] = useState<IMedicationDosagesBase[]>();
    const [upcomingRefillsArray, setUpcomingRefillsArray] = useState<IMedicationDosagesBase[]>();
    const [takenDosagesArray, setTakenDosagesArray] = useState<IMedicationDosagesBase[]>();


    useEffect(()=>{

        let todaysDosages = userMedicationDosages.filter(dosage=>{
            return isToday(new Date(dosage.timeToTake))
        })

        let tempMissed = todaysDosages.filter(dosage=>{
            return dosage.hasBeenMissed && !dosage.hasBeenTaken;
        })
        setMissedDosagesArray([...tempMissed])

        let tempUpcoming = todaysDosages.filter(dosage=>{
            return !dosage.hasBeenMissed
        })
        setUpcomingDosagesArray([...tempUpcoming])

        //TODO
        // let tempUpcomingRefill = todaysDosages.filter(dosage=>{
        //     return !dosage.hasBeenMissed
        // })
        // setUpcomingRefillsArray([...tempUpcomingRefill])

        let tempTaken = todaysDosages.filter(dosage=>{
            return dosage.hasBeenTaken
        })
        setTakenDosagesArray([...tempTaken])

    },userMedicationDosages)

    const MissedDosages = () => {
        return (
            <View>
                {
                    missedDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                        if (dosage.hasBeenMissed && !dosage.hasBeenTaken) {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.medicationOwner.name}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }

    const UpcomingDosages = () => {
        return (
            <View>
                {
                    upcomingDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                        if (!dosage.hasBeenMissed && !dosage.hasBeenTaken && isToday(new Date(dosage.timeToTake))) {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.medicationOwner.name}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }

    const UpcomingRefills = () => {
        return (
            <View>
                {
                    upcomingRefillsArray.map((dosage: IMedicationDosagesBase, index: number) => {
                        if (dosage.hasBeenMissed && !dosage.hasBeenTaken && isToday(new Date(dosage.timeToTake))) {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.medicationOwner.name}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }

    const TakenDosages = () => {
        return (
            <View>
                {
                    takenDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                        if (dosage.hasBeenTaken && isToday(new Date(dosage.timeToTake))) {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.medicationOwner.name}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }

    return (
        <ScrollView>
            {/*@ts-ignore*/}
            <List.Subheader>Missed Dosages</List.Subheader>
            <Divider/>
            <MissedDosages/>
            {/*@ts-ignore*/}
            <List.Subheader>Upcoming Dosages</List.Subheader>
            <Divider/>
            <UpcomingDosages/>
            {/*@ts-ignore*/}
            <List.Subheader>Upcoming Refills</List.Subheader>
            <Divider/>
            <UpcomingRefills/>
            {/*@ts-ignore*/}
            <List.Subheader>Taken Dosages</List.Subheader>
            <Divider/>
            <TakenDosages/>
        </ScrollView>
    );
};

export default TodaysDosagesList;
