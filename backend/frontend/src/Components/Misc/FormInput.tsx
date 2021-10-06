import React from 'react';

const FormInput = (props: React.HTMLProps<HTMLInputElement>) => {

    return(
        <>
            <input {...props}/>
        </>
        )

};

export default FormInput;
