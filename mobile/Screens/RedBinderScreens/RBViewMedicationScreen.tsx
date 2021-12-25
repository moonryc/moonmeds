import React, {useContext} from 'react';

import {Text} from 'react-native';
import {StoreContext} from "../../Store/StoreContext";
import {format} from "date-fns";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";

const RBViewMedicationScreen = () => {

    const {selectedMedication} = useContext(StoreContext);



    return (
        <ScrollableLayout>

            <Text>Next Refill:</Text>
            <Text>{format(new Date(selectedMedication.nextFillDay), "MM/dd/yyyy")}</Text>
            <Text>Notes:</Text>
            <Text>{selectedMedication.userNotes}</Text>

            <Text>Todo Add Dosages Here</Text>
        </ScrollableLayout>
    );
};

export default RBViewMedicationScreen;
