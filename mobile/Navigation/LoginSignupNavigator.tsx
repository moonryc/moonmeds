import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginSignup/LoginScreen";
import SignupScreen from "../Screens/LoginSignup/SignupScreen";
import {
    Icon,
    IconRegistry,
    Layout,
    MenuItem,
    OverflowMenu,
    Text,
    TopNavigation,
    TopNavigationAction
} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


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


const LoginSignupNavigator = () => {

    const LoginStack = createNativeStackNavigator()

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
        <React.Fragment>

        <Layout style={styles.container}>
            <IconRegistry icons={EvaIconsPack}/>
            <LoginStack.Navigator initialRouteName={"Login"}
                                  screenOptions={{
                                      header: (props: any) => <NavigationHeader {...props}/>,
                                  }}
            >
                <LoginStack.Screen name={"Login"} component={LoginScreen}/>
                <LoginStack.Screen name={"Signup"} component={SignupScreen}/>
            </LoginStack.Navigator>
        </Layout>
        </React.Fragment>
    );
};

export default LoginSignupNavigator;
