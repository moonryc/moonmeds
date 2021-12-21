import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SettingsHomeScreen from "../../Screens/SettingsScreens/SettingsHomeScreen";
import {Icon, IconRegistry, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {SafeAreaView} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import SimulateApiCallsScreen from "../../Screens/SettingsScreens/SimulateApiCallsScreen";

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

    const SettingsStack = createNativeStackNavigator()

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={EditIcon}/>
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About'/>
                <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
            </OverflowMenu>
        </React.Fragment>
    );


    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon}/>
    );

    const NavigationHeader = ({navigation, back}: any) => {
        return (
                <TopNavigation
                    alignment='center'
                    title='TODAY'
                    accessoryLeft={renderBackAction}
                    accessoryRight={renderRightActions}
                />
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
            <SettingsStack.Screen name={"Settings Home"} component={SettingsHomeScreen}/>
            <SettingsStack.Screen name={"Devtools"} component={SimulateApiCallsScreen}/>
        </SettingsStack.Navigator>
</>
    );
};

export default TabSettingsNavigator;
