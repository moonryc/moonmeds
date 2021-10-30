import React, {useContext, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography} from "@mui/material";
import {ApiContext} from "../Context/ApiContext";
import {backgroundStyle, centeredTextStyle, titleStyle, wrapperStyle} from "../Styles";

const LoginPage = () => {

    const {postLogin} = useContext(ApiContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = (userName:string,password:string) => {
        postLogin(userName,password);
        window.location.href = "/UserAccount"
    }

    return (
        <Box sx={{...wrapperStyle, ...backgroundStyle}}>

            <Box sx={{width:'40vw', height:'50vh', position:'absolute', right:'30%', top:'15%'}}>
                <Typography sx={{...centeredTextStyle, ...titleStyle}}>Sign In</Typography>
                <TextField
                    sx={{color:'#fff'}}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    autoComplete="user"//@ts-ignore
                    autoFocustype={"text"}
                    name={"userName"}
                    onChange={(e)=>setUserName(e.target.value)}/>
                <br/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"   onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <Button type={"submit"} onClick={()=>handleClick(userName,password)}>Login</Button>
                <FormControlLabel
                    sx={{position:'absolute', right:0}}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"//TODO moooooon back end this!!!
                />
            </Box>
        </Box>
    );
};

export default LoginPage;
