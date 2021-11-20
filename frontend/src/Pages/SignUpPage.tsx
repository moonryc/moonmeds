import {
    Box,
    Button,
    Checkbox,
    FormControlLabel, Paper, TextField,
    Typography
} from "@mui/material";
import React, {useContext, useState} from "react";
import {ApiContext} from "../Context/ApiContext";
import {
    backgroundStyle,
    centeredTextStyle,
    titleStyle,
    wrapperStyle
} from "../Styles";

const SignUpPage = () => {
    const {postRegister} = useContext(ApiContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleClick = (userName: string, password: string, emailAddress:string) => {
        if(userName.length > 0 && password.length > 0 && emailAddress.length > 0) {
            postRegister(userName, password, emailAddress).then(
                (response) => (window.location.href = "/")
            );
        }
    };

    return (
        <Box sx={{
            ...wrapperStyle, ...backgroundStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
        }}>
            <Typography sx={{
                ...centeredTextStyle, ...titleStyle,
                marginTop: theme => theme.spacing(8),
                paddingBottom: theme => theme.spacing(3)
            }}>
                Sign Up
            </Typography>
            <Paper
                sx={{
                    width: ["40vw", "400px"],
                    right: "30%",
                    top: "15%",
                    padding: theme => theme.spacing(1)
                }}
            >

                <TextField
                    sx={{color: "#fff"}}
                    margin="normal"
                    required
                    fullWidth
                    id="Email"
                    label="Email"
                    autoComplete="Email" //@ts-ignore
                    autoFocustype={"text"}
                    type={'email'}
                    name={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    sx={{color: "#fff"}}
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    autoComplete="user" //@ts-ignore
                    autoFocustype={"text"}
                    name={"userName"}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <br/>

                <Button variant="contained" color="primary" fullWidth type={"submit"}
                        onClick={() => handleClick(userName, password, email)}>
                    Create Account
                </Button>
                <br/>
                <br/>
                <Button variant="contained" color="primary" fullWidth type={"submit"} onClick={() => {
                    window.location.href = "/login";
                }}>
                    Login To Existing Account
                </Button>
            </Paper>
        </Box>

    );
};

export default SignUpPage;
