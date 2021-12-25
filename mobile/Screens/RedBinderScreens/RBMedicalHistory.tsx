import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider, MenuItem} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
        height: "100%"
    },
    listItem:{
        minHeight:75,
    }
})


const RBMedicalHistory = () => {
    return (
        <ScrollableLayout>
            <MenuItem style={styles.listItem} title={"Medical History"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Surgery History"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Medication History"}/>
            <Divider/>
        </ScrollableLayout>
    );
};

export default RBMedicalHistory;
