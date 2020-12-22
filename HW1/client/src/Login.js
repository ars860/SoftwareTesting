import React, {useCallback, useState} from "react";
import {useAuth} from "./context/auth";
import {Link} from "react-router-dom";
import LoginService from "./service/LoginService";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const auth = useAuth()


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        LoginService.login(email, password).then(res => {
            if (res.authenticated) {
                auth.set(true, email)
                setError("")
            } else {
                setError("Wrong Credentials!")
            }
        })

    }, [auth, email, password])

    if (auth.authenticated === true) {
        return (
            <Link to="/logout">
                Logout
            </Link>
        )
    }

    return (
        <div className="Login">
            <form className="login-form" onSubmit={handleSubmit}>
                <div>Email</div>
                <input onChange={e => setEmail(e.target.value)} type="email"/>

                <div>Password</div>
                <input onChange={e => setPassword(e.target.value)} type="password"/>

                <button className="button" disabled={!validateForm()} type="submit">
                    Login
                </button>
            </form>
            <div className="error">
                {error}
            </div>
        </div>
    );
}