import React from 'react';

import {Text, View} from 'react-native';
import {Spinner} from "@ui-kitten/components";

const LoadingScreen = () => {
    return (
        <View>
            <Text>LOADING SCREEN</Text>
            <Spinner/>
        </View>
    );
};

export default LoadingScreen;
