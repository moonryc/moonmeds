import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {InputOutlined} from "@mui/icons-material";

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);

    const handleCurrentPassword = (e:any) => {
        setCurrentPassword(e.target.value)
    }

    const handleNewPassword = (e:any) => {
      setNewPassword(e.target.value)
    }
    
    const testIfNewPasswordIsValid = () => {
        let pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$/);
        return pattern.test(newPassword);
    }

    useEffect(() => {
        setIsNewPasswordValid(testIfNewPasswordIsValid())
    }, [newPassword]);



    return (
        <div>
            <TextField id={"outline-basic"} label={"New Password"} variant={"outlined"} onChange={(e)=>handleNewPassword(e)} type={"password"}/>

            
            <Button disabled={isNewPasswordValid}>Change Password</Button>
        </div>
    );
};

export default ChangePassword;
