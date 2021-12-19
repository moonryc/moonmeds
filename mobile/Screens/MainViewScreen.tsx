import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {UserContext} from "../Context/UserContext";

import LoginSignupScreen from "./LoginSignupScreen";
import {BottomNavigation} from "react-native-paper";
import CalendarScreen from "./CalendarScreen";
import MedicationsListScreen from "./MedicationsListScreen";
import RedBinderScreen from "./RedBinderScreen";
import SettingsScreen from "./SettingsScreen";
import {ApiContext} from "../Context/ApiContext";
import TodaysDosagesScreen from "./TodaysDosagesScreen";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: "100%"
    },
});


const MainViewScreen = () => {

    const {isLoggedIn, checkForValidToken} = useContext(UserContext);
    const {fetchMedicationsDosagesPersons} = useContext(ApiContext);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'calendar', title: 'Calendar', icon: 'calendar'},
        {key: 'today', title: 'Today', icon: 'clipboard-text'},
        {key: 'medications', title: 'Medications', icon: 'medical-bag'},
        {key: 'redbinder', title: 'Red Binder', icon: 'book'},
        {key: 'settings', title: 'Settings', icon: 'cog'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        calendar: CalendarScreen,
        today: TodaysDosagesScreen,
        medications: MedicationsListScreen,
        redbinder: RedBinderScreen,
        settings: SettingsScreen,
    });

    useEffect(() => {
        checkForValidToken()
    }, [])

    useEffect(()=>{
        if(isLoggedIn){
            fetchMedicationsDosagesPersons()
        }
    },[isLoggedIn])



    return (
        <View style={styles.container}>

            {isLoggedIn === null ? <View/> : isLoggedIn ? <>
                <BottomNavigation
                    barStyle={{height: 80, backgroundColor: '#694fad', justifyContent: "space-between"}}
                    navigationState={{index, routes}}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </> : <LoginSignupScreen/>}
        </View>
    );
};

export default MainViewScreen;
