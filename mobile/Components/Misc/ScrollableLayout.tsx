import React from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Layout} from "@ui-kitten/components";
import {CommonStyles} from "../../Styles/CommonStyles";

const ScrollableLayout = (props: any) => {
    return (
        <View style={{flex:1}}>
         <Layout style={{flex:1}}>
             <ScrollView style={{flex:1, ...CommonStyles.scrollViewContainer}}>
                 <Layout style={{flex:1}}>
                 <View style={{flex:1}}>
                    {props.children}
                 </View>
                 </Layout>
            </ScrollView>
         </Layout>
         </View>
    );
};

export default ScrollableLayout;
