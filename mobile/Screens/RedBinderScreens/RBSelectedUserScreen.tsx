import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Avatar, Divider, MenuItem} from "@ui-kitten/components";
import {MaterialIcons} from "@expo/vector-icons";

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

const RBSelectedUserScreen = () => {

    const face =()=>(
        <MaterialIcons name="face" size={100} color="white"/>
    )

    return (
        <ScrollView style={styles.container}>
            <View style={{display:"flex",alignItems:"center", margin:25}}>
            <Avatar
                ImageComponent={face}
            />
            </View>


            <MenuItem style={styles.listItem} title={"Medications"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Surgery History"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Medication History"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Medication Interactions"}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Edit User"}/>
            <Divider/>
        </ScrollView>
    );
};

export default RBSelectedUserScreen;
