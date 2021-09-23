import React from 'react';

const LoginButton = () => {

    return (
        <div>
            <form action={"/auth/login"}>
                <button type={"submit"} value={"login"}>Login</button>
            </form>
        </div>
    );
};

export default LoginButton;
