import React, {useContext, useRef, useState} from 'react';
import {UserContext} from "../../Context/UserContext";
import {SwipeRow} from 'react-native-swipe-list-view';
import {MaterialIcons} from '@expo/vector-icons';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IPersonNameAndColor} from "../../../Types/UserTypes";
import {Button, Card, Divider, Menu, MenuItem, Modal, Text} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {useGlobalUser} from "../../Hooks/GlobalStoreHooks";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
        height: "100%"
    },
    standaloneRowFront: {
        paddingLeft: 15,
        alignItems: 'flex-start',
        backgroundColor: '#222b45',
        justifyContent: 'center',
        textAlignVertical: "center",
        minHeight: 75,
        color: "white",
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#b13930',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        maxHeight: 75,
        borderWidth: 0,
        color: "white",
    },
    backTextWhite: {
        color: '#FFF',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    listItem: {
        minHeight: 75,
    }

});

const RedBinderHomeScreen = ({navigation}: any) => {

    const {usersPeople} = useContext(UserContext);

    const {setGlobalUser} = useGlobalUser()


    return (
        <ScrollableLayout>
                <View>
                    <Divider/>
                    {usersPeople.map((person, index) => {
                        return (
                            <React.Fragment key={index}>
                                <TouchableOpacity activeOpacity={.2}
                                                  onPress={() => {
                                                      setGlobalUser(person)
                                                      navigation.navigate("Selected User", {headerName: person.name})
                                                  }}>
                                    <View style={{
                                        ...styles.standaloneRowFront,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        alignContent: "center"
                                    }}>
                                        <Text style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <MaterialIcons name="face" size={24} color={person.color}/>
                                        </Text>
                                        <Text style={{...styles.backTextWhite}}>{person.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <Divider/>
                            </React.Fragment>
                        )
                    })}
                </View>
        </ScrollableLayout>
    );
};


export default RedBinderHomeScreen;
