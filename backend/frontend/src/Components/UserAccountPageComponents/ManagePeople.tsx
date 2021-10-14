import React, {useContext, useState} from 'react';
import {Button, Chip, List, ListItem, Paper, TextField} from "@mui/material";
import {Face} from "@mui/icons-material";
import {UserContext} from "../../Context/UserContext";
import {ApiContext} from "../../Context/ApiContext";

const ManagePeople = () => {

    const {usersPeople} = useContext(UserContext);
    const {putDeleteSelectedPerson,postPerson} = useContext(ApiContext);


    const [newName, setNewName] = useState<string>("");


    const handleOnNameChange = (e:any) => {
      setNewName(e.target.value)
    }

    const deletePerson = (name:string):void => {
        let tempArrayOfNames = usersPeople
        let indexToBeRemoved = tempArrayOfNames.indexOf(name)
        tempArrayOfNames.splice(indexToBeRemoved,1)
        putDeleteSelectedPerson(tempArrayOfNames)
    }

    const addPerson = (name:string):void => {
        postPerson([...usersPeople,name])
        // setNewName("")
    }

    return (
        <div>
            <Paper>
                <Chip color={"secondary"} icon={<Face/>} label={"Default users Name"}/>
                {usersPeople.map((person:string)=><Chip color={"secondary"} icon={<Face/>} label={person} onDelete={()=>deletePerson(person)}/>)}
                <TextField variant={"filled"} onChange={(e)=>handleOnNameChange(e)} value={newName} type={"text"}/>
                <Button onClick={()=>addPerson(newName)}>Add Person </Button>
            </Paper>
        </div>
    );
};

export default ManagePeople;
