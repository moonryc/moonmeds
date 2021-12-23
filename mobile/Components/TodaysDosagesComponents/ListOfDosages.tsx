import React, {useRef} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwipeRow} from "react-native-swipe-list-view";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";

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
        borderBottomColor: "#151a31",
        borderBottomWidth: 1,
        color: "white",
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#bababb',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        maxHeight: 75,
        borderBottomColor: "#151a31",
        borderBottomWidth: 1,
        color: "white",
    },
    backTextWhite: {
        color: '#FFF',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});

interface IListOfDosages {
    dosagesArray:IMedicationDosagesBase[]|undefined
}

const ListOfDosages:React.FC<IListOfDosages> = ({dosagesArray}) => {

    const rowRefs = useRef([]);
    return (
        <View>
            {dosagesArray === undefined? <View/>:
            dosagesArray.map((medication, index) => {
                return (
                    <React.Fragment key={index}>
                        <SwipeRow
                            disableRightSwipe={true}
                            rightOpenValue={-75}
                            preview={true}
                            closeOnRowPress={true}
                            ref={ref => {
                                // @ts-ignore
                                rowRefs[index] = ref
                            }}

                        >
                            <View style={styles.standaloneRowBack}>
                                <MaterialIcons name="more-horiz" size={40} color="white" />
                            </View>
                            <TouchableOpacity style={{backgroundColor:"#222b45"}} activeOpacity={1} onPress={() => {
                                // @ts-ignore
                                if (!rowRefs[index].isOpen) {
                                    // navigation.navigate("Selected User", {headerName: medication.prescriptionName})
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
                                        <MaterialCommunityIcons name="pill" size={24} color={medication.medicationOwner.color} />
                                    </Text>
                                    <Text style={{...styles.backTextWhite}}>{medication.prescriptionName}</Text>
                                </View>
                            </TouchableOpacity>
                        </SwipeRow>
                    </React.Fragment>
                )
            })
            }
        </View>
    );
};

export default ListOfDosages;
