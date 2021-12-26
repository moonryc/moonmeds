import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Avatar, Divider, MenuItem} from "@ui-kitten/components";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {CommonStyles} from "../../Styles/CommonStyles";



const RBSelectedUserScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const face =()=>(
        <MaterialIcons name="face" size={100} color="white"/>
    )

    return (
        <ScrollableLayout>
            <View style={{display:"flex",alignItems:"center", margin:25}}>
            <Avatar
                ImageComponent={face}
            />
            </View>

            <Divider style={{borderBottomWidth:1.2}}/>
            <MenuItem style={CommonStyles.listItem} title={"Medications"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("User Medications", {headerName:"Medications", user: route.params.headerName})}}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title={"Medical History"}  onPress={()=>{
                //@ts-ignore
                navigation.navigate("Medical History", {headerName:"Medication History"})
            }}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title={"Medication Interactions"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Medication Interaction", {headerName:"Medication Interactions"})
            }}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title={"Edit User"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Edit User", {headerName:"Edit User"})
            }}/>
            <Divider/>


            <MenuItem style={{marginTop:50}} title={"Delete User"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Delete User", {headerName:"Edit User"})
            }}/>

        </ScrollableLayout>
    );
};

export default RBSelectedUserScreen;
