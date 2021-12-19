import React, {useContext} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import LoginScreen from "./LoginSignup/LoginScreen";
import SignupScreen from "./LoginSignup/SignupScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {UserContext} from "../Context/UserContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',


    },
});


const LoginSignupScreen = () => {

    const Stack = createNativeStackNavigator()

    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{title: 'Welcome'}}
                />
                <Stack.Screen
                    name="signup"
                    component={SignupScreen}
                    options={{title: 'Signup'}}
                />
            </Stack.Navigator>
        </View>
    );
};

export default LoginSignupScreen;
