import React, {useCallback} from 'react';

import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import {
    BottomNavigation,
    BottomNavigationTab, Icon,
    Layout,
    MenuItem,
    OverflowMenu, TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import TabCalendarNavigator from "./Tabs/TabCalendarNavigator";
import TabTodaysDosagesNavigator from "./Tabs/TabTodaysDosagesNavigator";
import TabRedBinderNavigator from "./Tabs/TabRedBinderNavigator";
import TabSettingsNavigator from "./Tabs/TabSettingsNavigator";
import {Navigator, Screen} from './StackNavigators';
import * as OS from "os";

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




const HomeScreenNavigation = () => {


    const BottomTabBar = useCallback(({navigation, state}: any) => (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab title='CALENDAR'/>
            <BottomNavigationTab title='TODAY'/>
            <BottomNavigationTab title='RED BINDER'/>
            <BottomNavigationTab title='SETTINGS'/>
        </BottomNavigation>
    ), [])

    const TabNavigator = useCallback(() => (
        <Navigator
            tabBar={(props: any) => <BottomTabBar {...props}/>}
            screenOptions={{headerShown: false}}
        >
            <Screen name='Calendar' component={TabCalendarNavigator}/>
            <Screen name='Today' component={TabTodaysDosagesNavigator}/>
            <Screen name='Red Binder' component={TabRedBinderNavigator}/>
            <Screen name='SettingsScreen' component={TabSettingsNavigator}/>
        </Navigator>
    ),[]);


    return (
        <Layout style={styles.container}>
            <TabNavigator/>
        </Layout>
    );
};

export default HomeScreenNavigation;
