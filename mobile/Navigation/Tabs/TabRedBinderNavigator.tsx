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
            </RedBinderStack.Navigator>
        </>
    );
};

export default TabRedBinderNavigator;
