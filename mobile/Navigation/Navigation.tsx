import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from "../Context/UserContext";
import LoadingScreen from "../Screens/LoadingScreen";
import HomeScreenNavigation from "./HomeScreenNavigation";
import LoginSignupNavigator from "./LoginSignupNavigator";
import {View,Text} from "react-native";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import {ApiContext} from "../Context/ApiContext";


const Navigation = () => {

    const {isLoggedIn, checkForValidToken} = useContext(UserContext);
    const {fetchMedicationsDosagesPersons}= useContext(ApiContext)


    useEffect(() => {
        checkForValidToken()
        console.log(isLoggedIn)
    }, [])

    useEffect(()=>{
        console.log("is logged in is updated")


        if(isLoggedIn){
            fetchMedicationsDosagesPersons()
            console.log("fetch ran")
        }
    },[isLoggedIn])

    return (

        <React.Fragment>
            {isLoggedIn === null ? <LoadingScreen/>: isLoggedIn ? <HomeScreenNavigation/>:<LoginSignupNavigator/>}
        </React.Fragment>

    );
};

export default Navigation;
