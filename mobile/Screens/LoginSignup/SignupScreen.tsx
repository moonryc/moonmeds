import React, {useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Button, Input} from "@ui-kitten/components";



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
        <ScrollView style={{margin:30}}>


            <Input
                style={{marginTop:30}}

                label={"First Name"}
                value={submitObject.firstName}
                onChangeText={(value) => {
                    setSubmitObject((prevState)=>({
                        ...prevState, firstName: value}))
                }}/>


            <Input style={{marginTop:30}}  label={"Last Name"} value={submitObject.lastName} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, lastName: value}))
            }}/>


            <Input style={{marginTop:30}}  label={"Username"} value={submitObject.username} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, username: value}))
            }}/>


            <Input style={{marginTop:30}}  label={"Email"} value={submitObject.email} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, email: value}))
            }}/>


            <Input style={{marginTop:30}}  label={"Password"} value={submitObject.password} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, password: value}))
            }}/>


            <Input style={{marginTop:30}}  label={"Confirm Password"} value={submitObject.passwordCheck} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, passwordCheck: value}))
            }}/>

            <Button style={{marginTop:30}}>Create account</Button>

        </ScrollView>
    );
};

export default SignupScreen;
