import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Avatar, Divider, MenuItem} from "@ui-kitten/components";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

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

    const navigation = useNavigation()

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

            <Divider style={{borderBottomWidth:1.2}}/>
            <MenuItem style={styles.listItem} title={"Medications"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("User Medications", {headerName:"Medications"})}}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Medical History"}  onPress={()=>{
                //@ts-ignore
                navigation.navigate("Medical History", {headerName:"Medication History"})
            }}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Medication Interactions"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Medication Interaction", {headerName:"Medication Interactions"})
            }}/>
            <Divider/>
            <MenuItem style={styles.listItem} title={"Edit User"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Edit User", {headerName:"Edit User"})
            }}/>
            <Divider/>
        </ScrollView>
    );
};

export default RBSelectedUserScreen;
