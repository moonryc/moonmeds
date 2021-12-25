import React, {useContext} from 'react';
import {ApiContext} from "../../Context/ApiContext";
import {Button} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";

const SimulateApiCallsScreen = () => {

    const {postLogin, fetchMedicationsDosagesPersons} = useContext(ApiContext);


    return (

        <ScrollableLayout>
            <Button style={{margin: 15}}  onPress={() => postLogin("moonryc", "qwerty")}>Simulate
                Login</Button>
            <Button style={{margin: 15}}  onPress={() => {
                console.log("I was pressed")
                fetchMedicationsDosagesPersons()
            }}>Fetch data</Button>
        </ScrollableLayout>
    );
};

export default SimulateApiCallsScreen;
