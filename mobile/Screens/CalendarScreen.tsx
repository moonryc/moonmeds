import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {Appbar, Menu} from "react-native-paper";
import SelectedMedication from "../Components/MedicationListComponents/SelectedMedication";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import loginScreen from "./LoginSignup/LoginScreen";
import SignupScreen from "./LoginSignup/SignupScreen";

const CalendarScreen = () => {

    const CustomNavigationBar=({ navigation, back }:any) =>{

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content color={"white"} title={"Calendar"}/>

            </Appbar.Header>
        );
    }

    const Stack = createNativeStackNavigator()

    const Test = () => {
        return(<Text>Hello</Text>)
    }

    return (
        <>
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        header: (props:any) => <CustomNavigationBar {...props} />
                    }}>
                    <Stack.Screen name={"Your Medications"} component={Test}/>

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default CalendarScreen;
