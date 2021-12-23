import React, {useContext, useEffect, useRef, useState} from 'react';

import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Layout, Menu, MenuItem} from "@ui-kitten/components";
import {SwipeRow} from "react-native-swipe-list-view";
import {MaterialIcons} from "@expo/vector-icons";
import {MedicationContext} from "../../Context/MedicationContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import ListOfDosages from "../../Components/TodaysDosagesComponents/ListOfDosages";


const TodaysDosagesHomeScreen = ({navigation, route}: any) => {

    const {userMedicationDosages} = useContext(MedicationContext);

    const [takenDosages, setTakenDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [upcomingDosages, setUpcomingDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [refillDosages, setRefillDosages] = useState<IMedicationDosagesBase[]|undefined>();
    const [missedDosages, setMissedDosages] = useState<IMedicationDosagesBase[]|undefined>();


    useEffect(() => {
        let tempTaken:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (dosage.hasBeenTaken) {
                return true
            }
        })
        if(tempTaken?.length<1){
            tempTaken = undefined
        }
        let tempUpcoming:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (!dosage.hasBeenTaken && !dosage.hasBeenMissed) {
                return true
            }
        })
        if(tempUpcoming?.length<1){
            tempUpcoming = undefined
        }

        let tempMissed:undefined|IMedicationDosagesBase[] = userMedicationDosages.filter((dosage) => {
            if (!dosage.hasBeenTaken && dosage.hasBeenMissed) {
                return true
            }
        })
        if(tempMissed?.length<1){
            tempUpcoming = undefined
        }
        setTakenDosages(tempTaken)
        setUpcomingDosages(tempUpcoming)
        setMissedDosages(tempMissed)
    }, [userMedicationDosages])


    return (

        <ScrollView style={{backgroundColor: '#1a2139', flex: 1, height: "100%"}}>
            <View>
                <Menu>
                    {missedDosages !== undefined ? <React.Fragment>
                        <MenuItem title='Missed' activeOpacity={1}/>
                        <Divider/>
                        <ListOfDosages dosagesArray={takenDosages}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}

                    {upcomingDosages !== undefined ? <React.Fragment>
                        <MenuItem title='Upcoming' activeOpacity={1}/>
                        <Divider/>
                        <ListOfDosages dosagesArray={upcomingDosages}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}

                    {takenDosages !== undefined ? <React.Fragment>
                        <MenuItem title='Taken' activeOpacity={10}/>
                        <Divider/>
                        <ListOfDosages dosagesArray={takenDosages}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}
                </Menu>
            </View>
        </ScrollView>


    );
};

export default TodaysDosagesHomeScreen;
