import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import MyStatusBar from "./Components/Misc/MyStatusBar";

import {NavigationContainer} from "@react-navigation/native";

import MainViewScreen from "./Screens/MainViewScreen";
import {UserContextContainer} from "./Context/UserContext";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",

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
              <View style={styles.container}>
              <MyStatusBar/>
              <MainViewScreen/>
              </View>
          </UserContextContainer>
      </NavigationContainer>
  </PaperProvider>
  );
}