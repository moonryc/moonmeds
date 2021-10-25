import React, {useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {ApiContext} from "../Context/ApiContext";

const LoginPage = () => {

    const {postLogin} = useContext(ApiContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
                userName:
                <TextField type={"text"} name={"userName"} onChange={(e)=>setUserName(e.target.value)}/>
                <br/>
                Password:
                <TextField type={"text"} name={"password"} onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <Button type={"submit"} onClick={()=>postLogin(userName,password)}>Login</Button>

        </div>
    );
};

export default LoginPage;
