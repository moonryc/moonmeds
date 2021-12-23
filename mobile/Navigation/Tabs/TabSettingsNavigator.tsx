import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SettingsHomeScreen from "../../Screens/SettingsScreens/SettingsHomeScreen";
import {Divider, Icon, IconRegistry, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {View} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import SimulateApiCallsScreen from "../../Screens/SettingsScreens/SimulateApiCallsScreen";
import SettingsAccountSettingsScreen from "../../Screens/SettingsScreens/SettingsAccountSettingsScreen";
import SettingsNotificationsScreen from "../../Screens/SettingsScreens/SettingsNotificationsScreen";
import SettingsThemeScreen from "../../Screens/SettingsScreens/SettingsThemeScreen";
import {SettingsStack} from "../StackNavigators";

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back'/>
);

const EditIcon = (props: any) => (
    <Icon {...props} name='edit'/>
);

const MenuIcon = (props: any) => (
    <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props: any) => (
    <Icon {...props} name='info'/>
);

const LogoutIcon = (props: any) => (
    <Icon {...props} name='log-out'/>
);



const TabSettingsNavigator = ({navigation:{navigate}}:any) => {



    const NavigationHeader = ({navigation, back, route}: any) => {

        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title={route.name}
                    accessoryLeft = {back? <TopNavigationAction icon={BackIcon} onPress={()=>navigation.goBack()}/>:<View/>}
                />
                <Divider/>
            </React.Fragment>
        )
    }

    return (
<>
    <IconRegistry icons={EvaIconsPack}/>
        <SettingsStack.Navigator
            screenOptions={{
                header: (props: any) => <NavigationHeader {...props}/>,
            }}
        >
            <SettingsStack.Screen name={"Settings"} component={SettingsHomeScreen}/>
            <SettingsStack.Screen name={"Devtools"} component={SimulateApiCallsScreen}/>
            <SettingsStack.Screen name={"Account Settings"} component={SettingsAccountSettingsScreen}/>
            <SettingsStack.Screen name={"Notifications"} component={SettingsNotificationsScreen}/>
            <SettingsStack.Screen name={"Theme"} component={SettingsThemeScreen}/>
        </SettingsStack.Navigator>
</>
    );
};

export default TabSettingsNavigator;
