import React from 'react';
import {useHistory} from "react-router-dom";

const LogoutButton = () => {

    return (
        <div>
            <form action={"/auth/logout"}>
                <button type={"submit"} value={"logout"}>Logout</button>
            </form>
        </div>
    );
};

export default LogoutButton;
