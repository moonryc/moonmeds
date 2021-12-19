import React, {useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import {ScrollView, Text, View} from 'react-native';
import {Appbar, Button, Divider, Menu, TouchableRipple} from "react-native-paper";
import {UserContext} from "../Context/UserContext";
import {ApiContext} from "../Context/ApiContext";
import {List} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SimulateApiCalls from "../Components/SettingsComponents/SimulateApiCalls";

const SettingsScreen = () => {

    const {setIsLoggedIn, checkForValidToken} = useContext(UserContext);

    const Stack = createNativeStackNavigator()


    const logOut = () => {
        SecureStore.setItemAsync("moonmeds-JWT", "")
        setIsLoggedIn(false)
    }

    const CustomNavigationBar = ({navigation, back}: any) => {

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
                <Appbar.Content color={"white"} title={"Settings"}/>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => logOut()} title="Log Out" />
                </Menu>
            </Appbar.Header>
        );
    }

    const ListOfOptions = ({navigation}: any) => {
        return (
            <ScrollView>
                <TouchableRipple
                    onPress={() => navigation.navigate("ApiCalls")}
                    rippleColor="rgba(0, 0, 0, .32)"

                >
                    <List.Item
                        title={"Api Calls"}
                        titleStyle={{height:35,fontSize:25,}}
                    />
                </TouchableRipple>
                <Divider/>
            </ScrollView>
        )
    }

    return (

        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    header: (props: any) => <CustomNavigationBar {...props} />
                }}>
                <Stack.Screen name={"settings"} component={ListOfOptions}/>
                <Stack.Screen name={"ApiCalls"} component={SimulateApiCalls}/>

            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default SettingsScreen;
