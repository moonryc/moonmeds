import React, {useCallback, useState} from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RedBinderHomeScreen from "../../Screens/RedBinderScreens/RedBinderHomeScreen";
import {
    Divider,
    Icon,
    IconRegistry,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import {View} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {RedBinderStack} from '../StackNavigators';
import RBSelectedUserScreen from "../../Screens/RedBinderScreens/RBSelectedUserScreen";
import {useRoute} from "@react-navigation/native";
import RBEditUser from "../../Screens/RedBinderScreens/RBEditUser";
import RBMedicalHistory from "../../Screens/RedBinderScreens/RBMedicalHistory";
import RBUserMedications from "../../Screens/RedBinderScreens/RBUserMedications";
import RBMedicationInteractions from "../../Screens/RedBinderScreens/RBMedicationInteractions";
import RBCreateMedication from "../../Screens/RedBinderScreens/RBCreateMedication";

const BackIcon = (props:any) => (
    <Icon {...props} name='arrow-back'/>
);


const TabRedBinderNavigator = () => {

    const NavigationHeader = ({navigation, back, route}: any) => {

        const customHeaderName = () => {
            return route.params.headerName
        }

        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title={route.name === "Home" ? "Red Binder" : customHeaderName()}
                    accessoryLeft={back ? <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/> :
                        <View/>}
                />
                <Divider/>
            </React.Fragment>

        )
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <RedBinderStack.Navigator
                screenOptions={{
                    header: (props: any) => <NavigationHeader {...props}/>,
                }}
            >
                <RedBinderStack.Screen name={"Home"} component={RedBinderHomeScreen}/>
                <RedBinderStack.Screen name={"Selected User"} component={RBSelectedUserScreen}/>

                <RedBinderStack.Screen name={"User Medications"} component={RBUserMedications}/>
                <RedBinderStack.Screen name={"Create Medication"} component={RBCreateMedication}/>



                <RedBinderStack.Screen name={"Medical History"} component={RBMedicalHistory}/>
                <RedBinderStack.Screen name={"Medication Interaction"} component={RBMedicationInteractions}/>
                <RedBinderStack.Screen name={"Edit User"} component={RBEditUser}/>
            </RedBinderStack.Navigator>
        </>
    );
};

export default TabRedBinderNavigator;
