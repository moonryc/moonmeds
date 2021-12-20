import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import MedicationList from "../Components/MedicationListComponents/MedicationList";
import EditMedication from "../Components/MedicationListComponents/EditMedication";
import {Appbar, Menu} from "react-native-paper";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TodaysDosagesList from "../Components/TodaysDosagesComponents/TodaysDosagesList";

const TodaysDosagesScreen = () => {

    const Stack = createNativeStackNavigator()

    const CustomNavigationBar=({ navigation, back }:any) =>{

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content color={"white"} title={"Today's Dosages"}/>
                {!back ? (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action icon="filter" color="white" onPress={openMenu} />
                        }>
                        <Menu.Item icon={"face"} onPress={() => {console.log('Option 1 was pressed')}} title="By Person" />
                        <Menu.Item icon={"format-list-bulleted"} onPress={() => {console.log('Option 2 was pressed')}} title="By Section" />

                    </Menu>
                ) : null}
            </Appbar.Header>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    header: (props:any) => <CustomNavigationBar {...props} />
                }}>
                <Stack.Screen name={"Your Medications"} component={TodaysDosagesList}/>
                {/*TODO*/}


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default TodaysDosagesScreen;
