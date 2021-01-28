import React, {useCallback, useState} from "react";
import {useAuth} from "../context/auth";
import {Link} from "react-router-dom";
import LoginService from "../service/LoginService";
import "../styles/Login.css";
import PropTypes from "prop-types";

export default function Login({register}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const auth = useAuth()


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        if (register) {
            LoginService.register(email, password).then(res => {
                if (res.success) {
                    auth.set(true, email)
                    setError("")
                } else {
                    setError(res.msg)
                }
            })
        } else {
            LoginService.login(email, password).then(res => {
                if (res.authenticated) {
                    auth.set(true, email)
                    setError("")
                } else {
                    setError("Wrong Credentials!")
                }
            })
        }

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
                    {register ? "Register" : "Login"}
                </button>
            </form>
            {!register &&
            <div className="no-account">
                No Account?
                <Link to="/register">register</Link>
            </div>
            }
            <div className="error">
                {error}
            </div>
        </div>
    );
}

Login.propTypes = {
    register: PropTypes.bool
}