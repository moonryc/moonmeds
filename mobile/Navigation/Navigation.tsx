import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from "../Context/UserContext";
import LoadingScreen from "../Screens/LoadingScreen";
import HomeScreenNavigation from "./HomeScreenNavigation";
import LoginSignupNavigator from "./LoginSignupNavigator";
import {View,Text} from "react-native";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";


const Navigation = () => {

    const {isLoggedIn, checkForValidToken} = useContext(UserContext);


    useEffect(() => {
        checkForValidToken()
        console.log(isLoggedIn)
    }, [])

    useEffect(()=>{
        console.log(isLoggedIn)
    },[isLoggedIn])

    return (

        <NavigationContainer>
            <View style={{height: Constants.statusBarHeight}}>
                <StatusBar style="auto" />
            </View>
            {isLoggedIn === null ? <LoadingScreen/>: <View/>}
            {isLoggedIn ? <HomeScreenNavigation/>:<LoginSignupNavigator/>}
        </NavigationContainer>

    );
};

export default Navigation;
