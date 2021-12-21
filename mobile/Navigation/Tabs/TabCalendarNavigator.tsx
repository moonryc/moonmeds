import React from 'react';
import {
    Icon,
    IconRegistry,
    MenuItem,
    OverflowMenu,
    Text,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CalendarHomeScreen from "../../Screens/CalendarScreens/CalendarHomeScreen";
import {SafeAreaView} from "react-native";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

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


const TabCalendarNavigator = () => {

    const CalendarStack = createNativeStackNavigator()

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
            <IconRegistry icons={EvaIconsPack}/>
            <CalendarStack.Navigator
                screenOptions={{
                    header: (props: any) => <NavigationHeader {...props}/>,
                }}
            >
                <CalendarStack.Screen name={"CalendarHome"} component={CalendarHomeScreen}/>
            </CalendarStack.Navigator>
        </React.Fragment>
    );
};

export default TabCalendarNavigator;
