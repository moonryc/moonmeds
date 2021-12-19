import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {Appbar, Divider, List, TouchableRipple} from "react-native-paper";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {UserContext} from "../Context/UserContext";
import RedBinderListPeople from "../Components/RedBinderListComponents/RedBinderListPeople";

const RedBinderScreen = () => {

    const Stack = createNativeStackNavigator()



    const CustomNavigationBar=({ navigation, back }:any) =>{

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content color={"white"} title={"Red Binder"}/>

            </Appbar.Header>
        );
    }

    return (

            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        header: (props:any) => <CustomNavigationBar {...props} />
                    }}>
                    <Stack.Screen name={"redbinder"} component={RedBinderListPeople}/>

                </Stack.Navigator>
            </NavigationContainer>

    );
};

export default RedBinderScreen;
