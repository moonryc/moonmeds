import React, {useState} from 'react';
import FormInput from "../../Components/Misc/FormInput";
import {useHistory} from "react-router-dom";



const Signup = () => {
    const history = useHistory();
    const navigateToPage = ()=> history.push('/login')

    const [user, setUser] = useState({email: "", password: ""})

    const handleEmailCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({...user, email: e.target.value}))
        console.log("Email: " + e.target.value);
    }
    const handlePasswordCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({...user, password: e.target.value}))
        console.log("password: " + e.target.value);
    }

    const submitSignup = async (data:{} = {})=>{
        let url='/users/submitsignup';
        // Default options are marked with *
        return await fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }


    return (
        <div>
            <h3>Signup</h3>
            <h3>Email</h3>
            <FormInput type={"email"} value={user.email} onChange={handleEmailCallBack}/>
            <h3>Password</h3>
            <FormInput type={"password"} value={user.password} onChange={handlePasswordCallBack}/><br/><br/>
            <button type={"button"} onClick={()=>submitSignup(user)}>Submit</button><br/><br/>
            <button type={"button"} onClick={()=>navigateToPage()}>Login</button>
        </div>
    );
};

export default Signup;
