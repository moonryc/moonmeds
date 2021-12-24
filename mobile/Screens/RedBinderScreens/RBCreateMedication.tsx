import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {makeMedication} from "../../typeConstructors";
import MedicationNameAutoComplete from "../../Components/RedBinderComponents/NewMedication/MedicationNameAutoComplete";
import {Button, ButtonGroup, Datepicker, IndexPath, Input, Layout, Select, SelectItem} from "@ui-kitten/components";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
    },
    anotherContainer: {
        display: "flex",
        flex: 1,
        alignContent: "center",
        // flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "100%"
    },
    item: {
        flex: 1,
        justifyContent: "space-evenly",
        minWidth: "80%"
    },
    datepicker: {
        marginVertical: 2,
    },
})

const useInputState = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return {value, onChangeText: setValue};
};

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return {date, onSelect: setDate};
};

let dosageType = ["Miligram",
    "Gram",
    "Mililiter",
    "liter",
    "Drop",
    "Tablet"]

const RBCreateMedication = () => {

    const [medicationObject, setMedicationObject] = useState(makeMedication);


    const [text, setText] = React.useState('Press any button');
    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));


    const multilineInputState = useInputState();
    const largeDatepickerState = useDatepickerState();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.anotherContainer}>
                <View style={styles.item}>
                    <MedicationNameAutoComplete/>
                </View>
                <View style={styles.item}>
                    <ButtonGroup size={"small"} style={{justifyContent: "center"}}>
                        <Button style={{minWidth: "40%"}} onPress={() => setText('Left button pressed')}>NEVER</Button>
                        <Button style={{minWidth: "40%"}} onPress={() => setText('Middle button pressed')}>SPECIFIC
                            DAY</Button>
                    </ButtonGroup>
                </View>
                <View style={styles.item}>
                    <View
                        style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
                        <Input

                            placeholder='Proscribed Dosage'
                            value={value}
                            onChangeText={nextValue => setValue(nextValue)}
                        />

                        <Select

                            selectedIndex={selectedIndex}
                            onSelect={index => {
                                setSelectedIndex(index)
                            }}
                            value={
                                //@ts-ignore
                                dosageType[selectedIndex.row]}
                        >
                            <SelectItem title='Miligram'/>
                            <SelectItem title='Gram'/>
                            <SelectItem title='Mililiter'/>
                            <SelectItem title='liter'/>
                            <SelectItem title='Drop'/>
                            <SelectItem title='Tablet'/>
                        </Select>
                    </View>
                </View>
                <View style={styles.item}>
                    <Datepicker
                        style={styles.datepicker}
                        size='large'
                        placeholder='Next Refill Date'
                        {...largeDatepickerState}
                    />
                </View>
                <View style={styles.item}>
                    <Input
                        multiline={true}
                        textStyle={{minHeight: 64}}
                        placeholder='Medication Notes'
                        {...multilineInputState}
                    />
                </View>

                <Button style={styles.item}>Schedule Dosages</Button>
            </View>
        </ScrollView>
    );
};

export default RBCreateMedication;
