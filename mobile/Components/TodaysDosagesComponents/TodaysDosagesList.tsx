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


    useEffect(() => {

        let todaysDosages = userMedicationDosages.filter(dosage => {
            return isToday(new Date(dosage.timeToTake))
        })

        let tempMissed = todaysDosages.filter(dosage => {
            return dosage.hasBeenMissed && !dosage.hasBeenTaken;
        })
        setMissedDosagesArray([...tempMissed])

        let tempUpcoming = todaysDosages.filter(dosage => {
            return !dosage.hasBeenMissed
        })
        setUpcomingDosagesArray([...tempUpcoming])

        //TODO
        // let tempUpcomingRefill = todaysDosages.filter(dosage=>{
        //     return !dosage.hasBeenMissed
        // })
        // setUpcomingRefillsArray([...tempUpcomingRefill])

        let tempTaken = todaysDosages.filter(dosage => {
            return dosage.hasBeenTaken
        })
        setTakenDosagesArray([...tempTaken])

    }, userMedicationDosages)

    const MissedDosages = () => {
        return (
            <View>
                {/*@ts-ignore*/}
                <List.Subheader>Missed Dosages</List.Subheader>
                <Divider/>
                {

                    missedDosagesArray === undefined ?
                        <View/> : missedDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.timeToTake}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        })


                }

            </View>
        )
    }

    const UpcomingDosages = () => {
        return (
            <View>
                {/*@ts-ignore*/}
                <List.Subheader>Upcoming Dosages</List.Subheader>
                <Divider/>
                {
                    upcomingDosagesArray === undefined ?
                        <View/> : upcomingDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.timeToTake}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        })
                }
            </View>
        )
    }

    const UpcomingRefills = () => {
        return (
            <View>
                {/*@ts-ignore*/}
                <List.Subheader>Upcoming Refills</List.Subheader>
                <Divider/>
                {
                    upcomingRefillsArray === undefined ?
                        <View/> : upcomingRefillsArray.map((dosage: IMedicationDosagesBase, index: number) => {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.timeToTake}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        })
                }
            </View>
        )
    }

    const TakenDosages = () => {
        return (
            <View>
                {/*@ts-ignore*/}
                <List.Subheader>Taken Dosages</List.Subheader>
                <Divider/>
                {
                    takenDosagesArray === undefined ?
                        <View/> : takenDosagesArray.map((dosage: IMedicationDosagesBase, index: number) => {
                            return (
                                <View key={index}>
                                    <TouchableRipple

                                        onPress={() => console.log('Pressed')}
                                        rippleColor="rgba(0, 0, 0, .32)"
                                    >
                                        <List.Item
                                            title={dosage.prescriptionName}
                                            description={dosage.timeToTake}
                                            onPress={() => {
                                            }}
                                            left={props => <List.Icon {...props} icon="pill"
                                                                      color={dosage.medicationOwner.color}/>}
                                        />
                                    </TouchableRipple>
                                    <Divider/>
                                </View>
                            )
                        })
                }
            </View>
        )
    }

    return (
        <ScrollView>
            
            <MissedDosages/>

            <UpcomingDosages/>

            <UpcomingRefills/>

            <TakenDosages/>
        </ScrollView>
    );
};

export default TodaysDosagesList;
