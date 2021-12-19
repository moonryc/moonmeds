import React, {useState} from 'react';
import {Appbar, Menu} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import EditMedication from "../Components/MedicationListComponents/EditMedication";
import MedicationList from "../Components/MedicationListComponents/MedicationList";


const MedicationsListScreen = () => {

    const Stack = createNativeStackNavigator()

    const CustomNavigationBar=({ navigation, back }:any) =>{

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content color={"white"} title={"Your Medications"}/>
                {!back ? (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                        }>
                        <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="New Medication" />
                        <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Delete Medications" />
                        <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Filter" />
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
                    <Stack.Screen name={"Your Medications"} component={MedicationList}/>
                    {/*TODO*/}
                    <Stack.Screen name={"Details"} component={EditMedication}/>

                </Stack.Navigator>
            </NavigationContainer>

    );
};

export default MedicationsListScreen;
