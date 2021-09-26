import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

const FormInput = (props: React.HTMLProps<HTMLInputElement>) => {

    return(
        <>
            <input {...props}/>
        </>
        )

};

export default FormInput;
