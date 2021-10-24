import React, {useEffect} from 'react';

const SendToLogin: React.FC<{[key:string]: any}> = () => {
    const sendToLogin = async () => {
        let url = '/auth/login'
        fetch(url,{method:('GET')})
            .then(response=>response.json)
            .then(data=>data)
    }


    useEffect(()=>{
        sendToLogin();
    }, []);



    return (
        <div>

        </div>
    );
};

export default SendToLogin;