import React from 'react';

import {Text, View} from 'react-native';
import {Autocomplete, AutocompleteItem} from "@ui-kitten/components";




const filter = (item:any, query:any) => item.title.toLowerCase().includes(query.toLowerCase());

let medications = [
    {title:"Asprin"}
];

const MedicationNameAutoComplete = () => {



    const [value, setValue] = React.useState<string>();
    const [data, setData] = React.useState(medications);

    const updateMedicationSuggestions = () => {
        fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?name=${value}`)
            .then(response=>{
                if(response.ok){
                    return response.json()
                }else{
                    throw "Error occured";
                }
            }).then(data=>{
                let tempArray = []
                let suggestionList = data.suggestionGroup.suggestionList.suggestion
                for(let suggestion of suggestionList){
                    tempArray.push({title:suggestion})
                }
                medications = [...tempArray]
                setData(tempArray)
        })
    }



    const onSelect = (index:any) => {
        setValue(medications[index].title);
    };

    const onChangeText = (query:any) => {
        updateMedicationSuggestions()
        setValue(query);
        setData(medications.filter(item => filter(item, query)));
    };

    const renderOption = (item:any, index:any) => (
        <AutocompleteItem
            key={index}
            title={item.title}
        />
    );


    return (
        <>
            <Autocomplete
                placeholder='Place your Text'
                value={value}
                onSelect={onSelect}
                onChangeText={onChangeText}>
                {data.map(renderOption)}
            </Autocomplete>
        </>
    );
};

export default MedicationNameAutoComplete;
