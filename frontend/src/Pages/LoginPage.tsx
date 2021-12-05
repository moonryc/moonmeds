import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {ApiContext} from "../Context/ApiContext";
import {backgroundStyle, centeredTextStyle, titleStyle, wrapperStyle} from "../Styles";

const LoginPage = () => {
    const {postLogin} = useContext(ApiContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = (userName: string, password: string) => {
        postLogin(userName, password).then(
            (response) => (window.location.href = "/")
        );
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
                Sign In
            </Typography>
            <Paper
                sx={{
                    width: ['70vw', , '700px'],
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
                    id="email"
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
                <div style={{display: "flex"}}>

                    {/*<div style={{ flex: 1 }}></div>*/}
                    {/*<FormControlLabel*/}
                    {/*  control={<Checkbox value="remember" color="primary" />}*/}
                    {/*  label="Remember me" //TODO moooooon back end this!!!*/}
                    {/*/>*/}
                </div>
                <Button variant="contained" color="primary" fullWidth type={"submit"}
                        onClick={() => handleClick(userName, password)}>
                    Login
                </Button>
                <br/>
                <br/>
                <Button variant="contained" color="primary" fullWidth type={"submit"} onClick={() => {
                    window.location.href = "/signup";
                }}>
                    Create Account
                </Button>
            </Paper>
        </Box>

    );
};

export default LoginPage;
