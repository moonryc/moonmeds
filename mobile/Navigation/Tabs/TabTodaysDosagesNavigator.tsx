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



const MenuIcon = (props: any) => (
    <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props: any) => (
    <Icon {...props} name='info'/>
);

const LogoutIcon = (props: any) => (
    <Icon {...props} name='log-out'/>
);


const TabTodaysDosagesNavigator = () => {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderRightActions = () => (
        <React.Fragment>

            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About'/>
                <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
            </OverflowMenu>
        </React.Fragment>
    );

    const NavigationHeader = ({navigation, back}: any) => {
        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title='TODAYS DOSAGES'
                    accessoryRight={renderRightActions}
                />
                <Divider/>
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
