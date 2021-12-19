import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from "@react-navigation/native";

import MainViewScreen from "./Screens/MainViewScreen";
import {UserContextContainer} from "./Context/UserContext";
import ApiContextContainer from "./Context/ApiContext";
import MedicationContextContainer from "./Context/MedicationContext";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",

    },
});


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};



export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <UserContextContainer>
                    <MedicationContextContainer>
                        <ApiContextContainer>
                            <View style={styles.container}>
                                <MainViewScreen/>
                            </View>
                        </ApiContextContainer>
                    </MedicationContextContainer>
                </UserContextContainer>
            </NavigationContainer>
        </PaperProvider>
    );
}