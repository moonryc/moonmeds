import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {UserContext} from "../../Context/UserContext";
import * as SecureStore from "expo-secure-store";
import {ApiContext} from "../../Context/ApiContext";
import {Button, Layout} from "@ui-kitten/components";

const SimulateApiCallsScreen = () => {

    const {postLogin, fetchMedicationsDosagesPersons} = useContext(ApiContext);

    const [expanded, setExpanded] = React.useState(true);

    const {checkForValidToken} = useContext(UserContext);
    const [jwtToken, setJwtToken] = useState<any>(null);

    return (

        <ScrollView>
            <ScrollView style={{height: 80, width: "100%"}}>
                <Text style={{justifyContent: "center"}}>{jwtToken}</Text>
            </ScrollView>
            <Button style={{margin: 15}}  onPress={() => checkForValidToken}>Check for valid
                token</Button>
            <Button style={{margin: 15}}  onPress={() => postLogin("moonryc", "qwerty")}>Simulate
                Login</Button>
            <Button style={{margin: 15}}  onPress={() => {
                console.log("I was pressed")
                fetchMedicationsDosagesPersons()
            }}>Fetch data</Button>
        </ScrollView>
    );
};

export default SimulateApiCallsScreen;
