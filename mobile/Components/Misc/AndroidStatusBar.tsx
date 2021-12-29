import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants";

const AndroidStatusBar = () => {
    return (
        <View style={{height: Constants.statusBarHeight}}>
            <StatusBar style="auto" />
        </View>
    );
};

export default AndroidStatusBar;

