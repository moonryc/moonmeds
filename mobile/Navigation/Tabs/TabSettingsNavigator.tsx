import React, {useContext} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SettingsHomeScreen from "../../Screens/SettingsScreens/SettingsHomeScreen";
import {Divider, Icon, IconRegistry, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {View} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import SimulateApiCallsScreen from "../../Screens/SettingsScreens/SimulateApiCallsScreen";
import SettingsAccountSettingsScreen from "../../Screens/SettingsScreens/SettingsAccountSettingsScreen";
import SettingsNotificationsScreen from "../../Screens/SettingsScreens/SettingsNotificationsScreen";
import {SettingsStack} from "../StackNavigators";
import {ThemeContext} from "../../App";

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back'/>
);

const SunIcon = (props: any) => (
    <Icon {...props} name='sun'/>
);

const MoonIcon = (props: any) => (
    <Icon {...props} name='moon'/>
);


const TabSettingsNavigator = ({navigation:{navigate}}:any) => {

    const {toggleTheme,theme} = useContext(ThemeContext);

    const NavigationHeader = ({navigation, back, route}: any) => {

        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title={route.name}
                    accessoryLeft = {back? <TopNavigationAction icon={BackIcon} onPress={()=>navigation.goBack()}/>:<View/>}
                    accessoryRight = {back? <View/>: theme==="light"?<TopNavigationAction icon={SunIcon} onPress={()=>toggleTheme()}/>:<TopNavigationAction icon={MoonIcon} onPress={()=>toggleTheme()}/>}
                />

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
        </SettingsStack.Navigator>
</>
    );
};

export default TabSettingsNavigator;
