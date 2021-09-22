import React from 'react';
import {useHistory} from "react-router-dom";

const LogoutButton = () => {
    const history = useHistory();
    const navigateToHome = ()=> history.push('/')

    const submitLogout = async () => {
        let url='/users/submitlogout';
        // Default options are marked with *
        return await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Message: ', data);
                navigateToHome();
            })
            .catch((error) => {
                console.error('Error: ', error);
            });

    }

    return (
        <div>
            <button onClick={()=>submitLogout()}>Logout</button>
        </div>
    );
};

export default LogoutButton;
