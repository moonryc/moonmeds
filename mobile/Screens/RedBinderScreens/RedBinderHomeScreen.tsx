import React, {useContext, useRef, useState} from 'react';
import {UserContext} from "../../Context/UserContext";
import {SwipeRow} from 'react-native-swipe-list-view';
import {MaterialIcons} from '@expo/vector-icons';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IPersonNameAndColor} from "../../../Types/UserTypes";
import {Button, Card, Divider, Modal, Text} from "@ui-kitten/components";

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

});

const RedBinderHomeScreen = ({navigation}: any) => {

    const {usersPeople} = useContext(UserContext);

    const [selectedUserForDeletion, setSelectedUserForDeletion] = useState<IPersonNameAndColor>();
    const [visible, setVisible] = useState(false);

    const rowRefs = useRef([]);

    const openDeleteConfirmation = (person: IPersonNameAndColor) => {
        setVisible(true)
        setSelectedUserForDeletion(person)
    }

    return (
        <React.Fragment>
            <ScrollView style={styles.container}>
                <View>
                    {usersPeople.map((person, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SwipeRow
                                    disableRightSwipe={true}
                                    preview={true}
                                    rightOpenValue={-75}
                                    stopRightSwipe={-125}
                                    closeOnRowPress={true}
                                    ref={ref => {
                                        // @ts-ignore
                                        rowRefs[index] = ref
                                    }}

                                >
                                    <View style={styles.standaloneRowBack}>
                                        <MaterialIcons name="delete" size={24} color="white"
                                                       onPress={() => openDeleteConfirmation(person)}/>
                                    </View>
                                    <TouchableOpacity style={{backgroundColor:"#222b45"}} activeOpacity={1} onPress={() => {
                                        // @ts-ignore
                                        if (!rowRefs[index].isOpen) {
                                            navigation.navigate("Selected User", {headerName: person.name})
                                        } else {
                                            // @ts-ignore
                                            rowRefs[index].closeRow()
                                        }
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
                                </SwipeRow>
                                <Divider/>
                            </React.Fragment>
                        )
                    })}
                </View>
            </ScrollView>

            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Text category={"h2"}>Caution!</Text>
                    {/*@ts-ignore*/}
                    <Text category={"h6"}>Are you sure you wish to delete {selectedUserForDeletion?.name}? This action
                        cannot be undone!</Text>
                    <Text>What will I loose?</Text>
                    <Button onPress={() => setVisible(false)}>
                        CANCEL
                    </Button>

                    {/*@ts-ignore*/}
                    <Button onPress={() => setVisible(false)}>
                        {/*@ts-ignore*/}
                        DELETE {selectedUserForDeletion?.name}
                    </Button>
                </Card>
            </Modal>

        </React.Fragment>
    );
};


export default RedBinderHomeScreen;
