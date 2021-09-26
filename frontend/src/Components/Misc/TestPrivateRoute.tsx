import React from 'react';
import {Button} from "@mui/material";

const TestPrivateRoute = () => {

    const checkIfLoggedIn = async ()=>{
        let url='/auth/current-session';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                if(data){

                    console.log("User data below: ");
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }


    const privateRoute = async() => {
        let url='/medication';
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => console.log(response))
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }
    
    return (
        <div>
            <Button onClick={()=>checkIfLoggedIn()}>privateRoute</Button>
        </div>
    );
};

export default TestPrivateRoute;
