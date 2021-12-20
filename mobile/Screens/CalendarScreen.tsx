import React, {useState} from 'react';
import {Appbar} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Calendar from "../Components/CalendarComponents/Calendar";

const CalendarScreen = () => {

    const CustomNavigationBar=({ navigation, back }:any) =>{

        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content color={"white"} title={"Calendar"}/>

            </Appbar.Header>
        );
    }

    const Stack = createNativeStackNavigator()



    return (
        <>
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        header: (props:any) => <CustomNavigationBar {...props} />
                    }}>
                    <Stack.Screen name={"Calendar"} component={Calendar}/>

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default CalendarScreen;
