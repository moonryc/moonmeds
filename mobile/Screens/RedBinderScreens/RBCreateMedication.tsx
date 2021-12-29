import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {makeMedication} from "../../typeConstructors";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Datepicker,
    IndexPath,
    Input,
    Select,
    SelectItem,
    Spinner,
    Toggle
} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {useOnMount} from "../../Hooks/MiscHooks";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {useGlobalUser} from "../../Hooks/GlobalStoreHooks";
import {useQuery} from "react-query";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";
import {ApiContext} from "../../Context/ApiContext";


const filter = (item: any, query: any) => item.title.toLowerCase().includes(query.toLowerCase());

let medications = [
    {title: "Asprin"}
];


const styles = StyleSheet.create({
    anotherContainer: {
        display: "flex",
        flex: 1,
        // alignContent: "center",
        justifyContent: "space-evenly",
        minHeight: "100%",
    },
    item: {
        flex: 1,
        justifyContent: "center",
        height: 100,
        // width: "80%",
        alignContent:"center",

    },
    datepicker: {
        marginVertical: 2,
    },
    controlContainer: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#3366FF',
    },
})


let dosageType = ["Miligram",
    "Gram",
    "Mililiter",
    "liter",
    "Drop",
    "Tablet"]

const RBCreateMedication = () => {


    const {fetchMedicationsDosagesPersons} = useContext(ApiContext);
    const {globalUser} = useGlobalUser()
    const navigation = useNavigation()

    const [medicationObject, setMedicationObject] = useState<IMedicationBase>(makeMedication);

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));

    const {isLoading, status, error, data: dataReturned, isFetching, refetch: postMedication} = useQuery("newMedication",
        async () => {
            setMedicationObject({...medicationObject, medicationOwner: globalUser})
            console.log(medicationObject)
            await SecureStore.getItemAsync("moonmeds-JWT").then(authKey => {
                if (authKey) {
                    fetch("https://moonmeds.herokuapp.com/medication/newMedication", {
                        method: "PUT", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: authKey,
                        },
                        body: JSON.stringify(medicationObject), // body data type must match "Content-Type" header
                    }).then(res => {
                        console.log(res.json())
                        return res.json()
                    })
                }
            })
        },
        {
            enabled: false,
            onSuccess: () => {
                updateMedicationData().then(r => r)
            }
        }
    )
    const {refetch: updateMedicationData} = useQuery("fetchMedication", () => {
        fetchMedicationsDosagesPersons()
    }, {
        enabled: false,
        onSuccess: () => {
            navigation.goBack()
        }
    })

    useEffect(() => {
        console.log(status)
        console.log(`is loading ${isLoading}`)
        console.log(`is error ${error}`)
        console.log(`data retured ${dataReturned}`)
        console.log(`is fetching: ${isFetching}`)
    }, [isLoading, error, dataReturned, isFetching]);


    useOnMount(() => {
        setMedicationObject(prevState => ({...prevState, medicationOwner: globalUser}))
    })

    //region AutoComplete
    const [data, setData] = useState(medications);

    const updateMedicationSuggestions = () => {
        fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?name=${medicationObject.prescriptionName}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw "Error occured";
                }
            }).then(data => {
            let tempArray = []
            let suggestionList = data.suggestionGroup.suggestionList.suggestion
            for (let suggestion of suggestionList) {
                tempArray.push({title: suggestion})
            }
            medications = [...tempArray]
            setData(tempArray)
        })

    }

    const onSelect = (index: any) => {
        setMedicationObject({...medicationObject, prescriptionName: medications[index].title})
        // setValue(medications[index].title);
    };

    const onChangeText = (query: any) => {
        updateMedicationSuggestions()
        // setValue(query);
        setMedicationObject({...medicationObject, prescriptionName: query})
        setData(medications.filter(item => filter(item, query)));
    };

    const renderOption = (item: any, index: any) => (
        <AutocompleteItem
            key={index}
            title={item.title}
        />
    );

    //endregion


    return (
        <ScrollableLayout>
            <View style={{...styles.anotherContainer}}>

                <Autocomplete
                    placeholder='Prescription Name'
                    value={medicationObject.prescriptionName}
                    style={styles.item}
                    onSelect={onSelect}
                    onChangeText={onChangeText}>
                    {data.map(renderOption)}
                </Autocomplete>

                {/*Indefinite toggle*/}

                <View style={styles.item}>
                    <Toggle
                        checked={medicationObject.inDefinite}
                        onChange={() => {
                            setMedicationObject({...medicationObject, inDefinite: !medicationObject.inDefinite})
                        }}>
                        Medication is indefinite
                    </Toggle>
                </View>
                {/*If not indefinite*/}

                <Datepicker
                    disabled={medicationObject.inDefinite}
                    style={{...styles.datepicker, ...styles.item}}
                    size='large'
                    date={medicationObject.endDate}
                    placeholder='Medication End Date'
                    onSelect={(nextDate => {
                        setMedicationObject({...medicationObject, endDate: nextDate})
                    })}
                />


                {/*Perscription dosage*/}


                <Input
                    style={styles.item}
                    keyboardType={"numeric"}
                    placeholder='Prescribed Dosage'
                    value={medicationObject.prescriptionDosage.toString() === "0" ? "" : medicationObject.prescriptionDosage.toString()}
                    onChangeText={(e) => {
                        if (e.length === 0) {
                            setMedicationObject({
                                ...medicationObject,
                                prescriptionDosage: 0
                            })
                        } else {
                            setMedicationObject({
                                ...medicationObject,
                                prescriptionDosage: parseFloat(e)
                            })
                        }

                    }}
                />

                <Select
                    style={styles.item}
                    selectedIndex={selectedIndex}
                    onSelect={index => {
                        setSelectedIndex(index)
                    }}
                    value={
                        //@ts-ignore
                        dosageType[selectedIndex.row]}
                >
                    <SelectItem title='Milligram'/>
                    <SelectItem title='Gram'/>
                    <SelectItem title='Milliliter'/>
                    <SelectItem title='liter'/>
                    <SelectItem title='Drop'/>
                    <SelectItem title='Tablet'/>
                </Select>


                {/*NExt refill date*/}

                <Datepicker
                    style={{...styles.datepicker, ...styles.item}}
                    size='large'
                    date={medicationObject.nextFillDay}
                    placeholder='Next Refill Date'
                    onSelect={(nextDate => {
                        setMedicationObject({...medicationObject, nextFillDay: nextDate})
                    })}
                />


                <Input
                    multiline={true}
                    style={styles.item}
                    textStyle={{minHeight: 64}}
                    placeholder='Medication Notes'
                    onChangeText={(e) => {
                        setMedicationObject({...medicationObject, userNotes: e})
                    }}
                />


                <Button>Schedule Dosages</Button>
                {isFetching || isLoading ?
                    <View style={styles.controlContainer}><Spinner status='basic'/></View> :
                    <Button onPress={() => postMedication()}>Save Medication</Button>
                }


            </View>

        </ScrollableLayout>
    );
};

export default RBCreateMedication;
