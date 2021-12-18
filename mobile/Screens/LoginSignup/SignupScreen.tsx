import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {Button, TextInput} from "react-native-paper";


interface ISubmitObject {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    passwordCheck: string,

}


const SignupScreen = () => {

    const [submitObject, setSubmitObject] = useState<ISubmitObject>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordCheck:"",
    });


    return (
        <View style={{margin:30}}>

            {/*@ts-ignore*/}
            <TextInput
                style={{marginTop:30}}
                mode={"flat"}
                label={"First Name"}
                value={submitObject.firstName}
                onChangeText={(value) => {
                    setSubmitObject((prevState)=>({
                        ...prevState, firstName: value}))
                }}/>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Last Name"} value={submitObject.lastName} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, lastName: value}))
            }}/>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Username"} value={submitObject.username} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, username: value}))
            }}/>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Email"} value={submitObject.email} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, email: value}))
            }}/>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Password"} value={submitObject.password} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, password: value}))
            }}/>

            {/*@ts-ignore*/}
            <TextInput style={{marginTop:30}} mode={"flat"} label={"Confirm Password"} value={submitObject.passwordCheck} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, passwordCheck: value}))
            }}/>

            <Button style={{marginTop:30}} mode={"contained"}>Create account</Button>

        </View>
    );
};

export default SignupScreen;
