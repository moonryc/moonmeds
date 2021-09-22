import React, {useState} from 'react';

const FormInput = (props: React.HTMLProps<HTMLInputElement>) => {

    return(
        <>
            <input style={{backgroundColor:"red"}} {...props}/>
        </>
        )

};

export default FormInput;
