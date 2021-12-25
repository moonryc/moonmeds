import React from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Layout} from "@ui-kitten/components";
import {CommonStyles} from "../../Styles/CommonStyles";

const ScrollableLayout = (props: any) => {
    return (
        <Layout style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Layout style={CommonStyles.scrollViewContainer}>
                    {props.children}
                </Layout>
            </ScrollView>
        </Layout>
    );
};

export default ScrollableLayout;
