import React, {useState} from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Card, Divider, Layout, Modal,Text} from "@ui-kitten/components";
import format from "date-fns/format";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import {IMedicationBase} from "../../../Types/MedicationTypes";

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

interface IListOfUpcomingMedications {
    medications:IMedicationBase[]
}

const ListOfUpcomingMedications:React.FC<IListOfUpcomingMedications> = ({medications}) => {

    const [visible, setVisible] = useState(false);
    const [selectedDosage, setSelectedDosage] = useState<IMedicationBase|undefined>();


    return (
        <React.Fragment>

            {medications === undefined? <View/>:
                medications.map((dosage, index) => {
                    return (
                        <React.Fragment key={index}>


                            <TouchableOpacity style={{backgroundColor:"#222b45"}} activeOpacity={1} onPress={() => {
                                setSelectedDosage(dosage)
                                setVisible(true)
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
                                        <MaterialCommunityIcons name="pill" size={24} color={dosage.medicationOwner.color} />
                                    </Text>
                                    <Text style={{...styles.backTextWhite}}>{dosage.prescriptionName}</Text>
                                </View>
                            </TouchableOpacity>

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
                        {/*<Text style={{textAlign:"center"}} category={"h4"}>{`${selectedDosage?.prescriptionName} ${selectedDosage?.amount}`}</Text>*/}




                                {/*<Text style={{textAlign:"center"}} category={"h4"}>{selectedDosage === undefined ? <View/>: format((new Date(selectedDosage.timeToTake)), "h:m bb")}</Text>*/}
                                <Button style={styles.button} onPress={() => setVisible(false)}>Mark As Taken</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Snooze Dosage</Button>
                                <Button style={styles.button} onPress={() => setVisible(false)}>Skip For Today</Button>



                    </Card>
                </Modal>

            </Layout>
        </React.Fragment>
    );
};

export default ListOfUpcomingMedications;
