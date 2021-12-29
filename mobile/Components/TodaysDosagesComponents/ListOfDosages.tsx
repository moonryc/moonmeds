import React, {useRef, useState} from 'react';
import format from 'date-fns/format'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SwipeRow} from "react-native-swipe-list-view";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import {Button, Card, Divider, Layout, MenuItem, Modal, Text} from "@ui-kitten/components";
import {CommonStyles} from "../../Styles/CommonStyles";

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#1a2139',
        flex: 1,
        height: "100%"
    },
    standaloneRowFront: {
        paddingLeft: 15,
        alignItems: 'flex-start',
        // backgroundColor: '#222b45',
        justifyContent: 'center',
        textAlignVertical: "center",
        minHeight: 75,
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
        borderWidth:0,
        color: "white",
    },
    backTextWhite: {
        color: '#FFF',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal:{
      maxHeight:"60%"
    },
    card:{
        minWidth:"80%",
        minHeight:"100%",
        display:"flex",
        justifyContent:"center"

    },
    button:{
        margin:10,
    }

});

interface IListOfDosages {
    dosagesArray:IMedicationDosagesBase[]|undefined
    typeOfList:"missed"|"taken"|"upcoming"|"refill"
}

const ListOfDosages:React.FC<IListOfDosages> = ({dosagesArray,typeOfList}) => {


    const [visible, setVisible] = useState(false);
    const [selectedDosage, setSelectedDosage] = useState<IMedicationDosagesBase|undefined>();

    return (
        <React.Fragment>
            {dosagesArray === undefined? <View/>:
            dosagesArray.map((dosage, index) => {
                return (
                    <React.Fragment key={index}>
                        <MenuItem
                            title={dosage.prescriptionName}
                            style={CommonStyles.listItem}
                            accessoryLeft={<MaterialCommunityIcons name="pill" size={22} color={dosage.medicationOwner.color} />}
                            onPress={() => {
                                setSelectedDosage(dosage)
                                setVisible(true)
                            }}
                        />
                        <Divider />
                    </React.Fragment>
                )
            })
            }

            <Layout style={styles.container} level='1'>

                <Modal
                    style={styles.modal}
                    visible={visible}
                       backdropStyle={styles.backdrop}
                       onBackdropPress={() => setVisible(false)}>

                    <Card
                        style={styles.card}
                        disabled={true}>
                        <Text style={{textAlign:"center"}} category={"h4"}>{`${selectedDosage?.prescriptionName} ${selectedDosage?.amount}`}</Text>

                        {typeOfList === "missed" ?
                            <React.Fragment>
                                <Text style={{textAlign:"center"}} category={"h4"}>{selectedDosage === undefined ? <View/>: format((new Date(selectedDosage.timeToTake)), "h:m bb")}</Text>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Mark As Taken</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Snooze Dosage</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Skip For Today</Button>
                            </React.Fragment>:<View/>}
                        {typeOfList === "upcoming" ?
                            <React.Fragment>
                                <Text style={{textAlign:"center"}} category={"h4"}>{selectedDosage === undefined ? <View/>: format((new Date(selectedDosage.timeToTake)), "h:m bb")}</Text>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Mark As Taken</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Snooze Dosage</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Skip For Today</Button>
                            </React.Fragment>:<View/>}
                        {typeOfList === "taken" ?
                            <React.Fragment>
                                <Text style={{textAlign:"center"}} category={"h4"}>{selectedDosage === undefined ? <View/>: format((new Date(selectedDosage.timeToTake)), "h:m bb")}</Text>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Mark As Not Taken</Button>
                            </React.Fragment>:<View/>}
                        {typeOfList === "refill" ?
                            <React.Fragment>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Set Next Refill Date</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Mark Medication as finished</Button>
                            </React.Fragment>:<View/>}
                    </Card>
                </Modal>

            </Layout>
        </React.Fragment>
    );
};

export default ListOfDosages;
