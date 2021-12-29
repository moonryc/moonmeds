import React from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
    Divider,
    Icon,
    IconRegistry,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import TodaysDosagesHomeScreen from "../../Screens/TodaysDosagesScreens/TodaysDosagesHomeScreen";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {SafeAreaView} from "react-native";
import {TodaysDosagesStack} from '../StackNavigators';

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back'/>
);





const TabTodaysDosagesNavigator = () => {

    const NavigationHeader = ({navigation, back}: any) => {
        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title='TODAYS DOSAGES'
                />
            </React.Fragment>

        )
    }

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <TodaysDosagesStack.Navigator
                screenOptions={{
                    header: (props: any) => <NavigationHeader {...props}/>,
                }}
            >
                <TodaysDosagesStack.Screen name={"Home"} component={TodaysDosagesHomeScreen}/>
            </TodaysDosagesStack.Navigator>
        </>
    );
};

export default TabTodaysDosagesNavigator;
