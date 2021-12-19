import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Button, List} from "react-native-paper";
import {UserContext} from "../../Context/UserContext";
import * as SecureStore from "expo-secure-store";
import {ApiContext} from "../../Context/ApiContext";

const SimulateApiCalls = () => {

    const {postLogin, fetchMedicationsDosagesPersons} = useContext(ApiContext);

    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const {checkForValidToken} = useContext(UserContext);
    const [jwtToken, setJwtToken] = useState<any>(null);


    useEffect(() => {
        SecureStore.getItemAsync("moonmeds-JWT").then(response => {
            return setJwtToken(response);
        })
    })

    return (
        <ScrollView>
            <Text style={{textAlign: "center", fontSize: 40}}>JWTToken</Text>
            <ScrollView style={{height: 80, width: "100%"}}>
                <Text style={{justifyContent: "center"}}>{jwtToken}</Text>
            </ScrollView>
            <Button style={{margin: 15}} mode={"contained"} onPress={() => checkForValidToken}>Check for valid
                token</Button>
            <Button style={{margin: 15}} mode={"contained"} onPress={() => postLogin("moonryc", "qwerty")}>Simulate
                Login</Button>
            <Button style={{margin: 15}} mode={"contained"} onPress={() => {
                fetchMedicationsDosagesPersons()
            }}>Fetch data</Button>
        </ScrollView>
    );
};

export default SimulateApiCalls;
