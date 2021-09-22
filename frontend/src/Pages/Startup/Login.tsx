import React, {useState} from 'react';
import FormInput from "../../Components/Misc/FormInput";
import {useHistory} from "react-router-dom";
import LogoutButton from "../../Components/Misc/LogoutButton";

const LoginPage = () => {
    const history = useHistory();
    const navigateToSignup = ()=> history.push('/signup');

    const [loginMessage, setLoginMessage] = useState("");

    //region FETCH
    const submitLogin = async (data:{} = {})=>{
        let url='/users/submitLogin';
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
                if(data.error){
                    setLoginMessage(data.message);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        return response;
    }
    //endregion

    const [user, setUser] = useState({email: "", password: ""})

    const handleEmailCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({...user, email: e.target.value}))
    }
    const handlePasswordCallBack = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({...user, password: e.target.value}))
    }

    return (
        <div>
            <h3>Login</h3>
            <h3>Email</h3>
            <FormInput type={"email"} value={user.email} onChange={handleEmailCallBack}/>
            <h3>Password</h3>
            <FormInput type={"password"} value={user.password} onChange={handlePasswordCallBack}/><br/><br/>
            <button value={"Login"} onClick={()=>submitLogin(user)}>Login</button><br/><br/>
            {loginMessage === "" ? <></>:<>{loginMessage}</>}
            <br/><br/>
            <button onClick={()=>navigateToSignup()}>Create an account</button>
            <LogoutButton/>
        </div>
    );
};

export default LoginPage;
