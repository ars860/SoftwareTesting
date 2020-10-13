import React, {useEffect} from 'react';
import {Redirect} from "react-router";
import {useAuth} from "./context/auth";

function Logout() {
    const auth = useAuth()
    
    useEffect(() => auth.set(false, undefined), [auth])
    
    return (
        <Redirect to="/" />
    )
}

export default Logout;