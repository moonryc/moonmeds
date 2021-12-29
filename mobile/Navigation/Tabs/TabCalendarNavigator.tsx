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
import {View} from "react-native";

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back'/>
);




const TabCalendarNavigator = () => {

    const [menuVisible, setMenuVisible] = React.useState(false);


    const NavigationHeader = ({navigation, back}: any) => {
        return (
            <React.Fragment>
                <TopNavigation
                    alignment='center'
                    title='TODAY'
                    accessoryLeft = {back? <TopNavigationAction icon={BackIcon} onPress={()=>navigation.goBack()}/>:<View/>}
                />
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
