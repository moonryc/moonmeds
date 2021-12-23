import React from 'react';
import {
    Divider,
    Icon,
    IconRegistry,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import CalendarHomeScreen from "../../Screens/CalendarScreens/CalendarHomeScreen";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {CalendarStack} from '../StackNavigators';

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
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title='TODAY'
                    accessoryLeft={renderBackAction}
                    accessoryRight={renderRightActions}
                />
                <Divider/>
            </React.Fragment>
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
