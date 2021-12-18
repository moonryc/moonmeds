import React, {useContext, useState} from 'react';

import {Text, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";
import {UserContext, UserContextContainer} from "../../Context/UserContext";


// @ts-ignore
const LoginScreen = ({navigation}) => {

    const {setIsLoggedIn} = useContext(UserContext)


    const [submitObject, setSubmitObject] = useState<{username:string,password:string}>({username:"",password:""});

    return (
        <View style={{margin:60}}>

            <View style={{marginTop:30, alignItems: 'center', justifyContent: 'center'}}>
                <Text>WELCOME TO MOONMEDS</Text>
                <Text>YOUR MEDICATIONS</Text>
                <Text>SIMPLIFIED</Text>
            </View>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Username"} value={submitObject.username} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, username: value}))
            }}/>
            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Username"} value={submitObject.password} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, password: value}))
            }}/>
            <Button style={{marginTop:30}} mode={"contained"} onPress={() => setIsLoggedIn(true)}>Login</Button>
            <Button style={{marginTop:30}} mode={"contained"} onPress={() => navigation.navigate("signup")}>Signup</Button>
        </View>
    );
};

export default LoginScreen;
