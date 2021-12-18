import React, {useContext, useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {UserContext} from "../Context/UserContext";
import LoginScreen from "./LoginSignup/LoginScreen";
import SignupScreen from "./LoginSignup/SignupScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import HomeScreen from "./HomeScreen";
import LoginSignupScreen from "./LoginSignupScreen";




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        width:"100%"
    },
});


const MainViewScreen = () => {

    const {isLoggedIn,checkForValidToken} = useContext(UserContext);

    useEffect(()=>{
        checkForValidToken()
    },[])


    return (
        <View style={styles.container}>

            {isLoggedIn === null ? <View/>: isLoggedIn ?  <HomeScreen/>: <LoginSignupScreen/> }
        </View>
    );
};

export default MainViewScreen;
