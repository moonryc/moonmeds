import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {UserContext} from "../../Context/UserContext";
import {ApiContext} from "../../Context/ApiContext";
import {Button, Input} from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";


// @ts-ignore
const LoginScreen = ({navigation:{navigate}}) => {


    const {postLogin} =useContext(ApiContext)

    const [submitObject, setSubmitObject] = useState<{username:string,password:string}>({username:"",password:""});

    return (
        <View style={{margin:60}}>


            <View style={{marginTop:30, alignItems: 'center', justifyContent: 'center'}}>
                <Text>WELCOME TO MOONMEDS</Text>
                <Text>YOUR MEDICATIONS</Text>
                <Text>SIMPLIFIED</Text>
            </View>


            <Input style={{marginTop:30}} label={"Username"} value={submitObject.username} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, username: value}))
            }}/>

            <Input style={{marginTop:30}} label={"Username"} value={submitObject.password} onChangeText={(value) => {
                setSubmitObject((prevState)=>({
                    ...prevState, password: value}))
            }}/>
            <Button style={{marginTop:30}} onPress={() => postLogin(submitObject.username,submitObject.password)}>Login</Button>
            <Button style={{marginTop:30}} onPress={() => {navigate('Signup')}}>Signup</Button>
        </View>
    );
};

export default LoginScreen;
