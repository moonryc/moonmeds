import React, {useContext, useEffect, useRef, useState} from 'react';

import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Layout, Menu, MenuItem} from "@ui-kitten/components";
import {SwipeRow} from "react-native-swipe-list-view";
import {MaterialIcons} from "@expo/vector-icons";
import {MedicationContext} from "../../Context/MedicationContext";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import ListOfDosages from "../../Components/TodaysDosagesComponents/ListOfDosages";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";


const TodaysDosagesHomeScreen = ({navigation, route}: any) => {

    const {userMedicationDosages,upcomingRefill,missedDosages,upcomingDosages,takenDosages} = useContext(MedicationContext);

    const [refillDosages, setRefillDosages] = useState<IMedicationDosagesBase[]|undefined>();


    return (

        <ScrollableLayout>
            <View>

                    {missedDosages !== undefined ? <React.Fragment>
                        <Divider/>
                        <MenuItem title='Missed' activeOpacity={1}/>

                        <Divider/>
                        <ListOfDosages dosagesArray={missedDosages} typeOfList={"missed"}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}

                    {/*TODO*/}
                    {upcomingDosages !== undefined ? <React.Fragment>
                        <MenuItem title='Upcoming' activeOpacity={1}/>
                        <Divider/>
                        <ListOfDosages dosagesArray={upcomingDosages} typeOfList={"upcoming"}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}

                    {takenDosages !== undefined ? <React.Fragment>
                        <MenuItem title='Taken' activeOpacity={10}/>
                        <Divider/>
                        <ListOfDosages dosagesArray={takenDosages} typeOfList={"taken"}/>
                    </React.Fragment> : <React.Fragment></React.Fragment>}
            </View>
        </ScrollableLayout>
    );
};

export default TodaysDosagesHomeScreen;
