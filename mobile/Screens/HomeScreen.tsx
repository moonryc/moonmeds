import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {BottomNavigation} from "react-native-paper";
import loginScreen from "./LoginSignup/LoginScreen";
import signupScreen from "./LoginSignup/SignupScreen";
import * as SecureStore from 'expo-secure-store';

const HomeScreen = () => {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',

        },
    });


        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([
            { key: 'login', title: 'Login', icon: 'queue-music' },
            { key: 'signup', title: 'Signup', icon: 'album' },
        ]);


    const renderScene = BottomNavigation.SceneMap({
    // @ts-ignore
        login: loginScreen,
        signup: signupScreen,

    });

    return (
        <View style={styles.container}>
            <Text>YOU ARE LOGGED IN!</Text>
            <Text>{JSON.stringify(SecureStore.getItemAsync("moonmeds-JWT"))}</Text>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </View>
    );
};

export default HomeScreen;
