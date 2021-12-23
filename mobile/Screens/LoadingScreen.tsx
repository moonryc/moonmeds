import React from 'react';

import {View} from 'react-native';
import {Spinner} from "@ui-kitten/components";

const LoadingScreen = () => {
    return (
        <View>
            <Spinner/>
        </View>
    );
};

export default LoadingScreen;
