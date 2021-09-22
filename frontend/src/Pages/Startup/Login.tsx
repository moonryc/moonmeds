import React, {useState} from 'react';
import FormInput from "../../Components/Misc/FormInput";
import {useHistory} from "react-router-dom";


//region FETCH
const submitLogin = async (data:{} = {})=>{
    let url='/backend/submitLogin';
    // Default options are marked with *
    const response = await fetch(url, {
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
    return response;
}


//endregion



const LoginPage = () => {
    const history = useHistory();
    const navigateToPage = ()=> history.push('/signup');

    const [user, setUser] = useState({email: "", password: ""})

    const handleEmailCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {

        setUser(user => ({...user, email: e.target.value}))
        console.log("Email: " + e.target.value);

    }
    const handlePasswordCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {

        setUser(user => ({...user, password: e.target.value}))
        console.log("password: " + e.target.value);
    }

    return (
        <div>
            <h3>Login</h3>
            <h3>Email</h3>
            <FormInput type={"email"} value={user.email} onChange={handleEmailCallBack}/>
            <h3>Password</h3>
            <FormInput type={"password"} value={user.password} onChange={handlePasswordCallBack}/><br/><br/>
            <button value={"Login"} onClick={()=>submitLogin(user)}>Login</button><br/><br/>
            <button onClick={()=>navigateToPage()}>Create an account</button>
        </div>
    );
};

export default LoginPage;
