import React, {useCallback, useState} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
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

    // function handleSubmit(event) {
    //     event.preventDefault();
    // }

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
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email">
                    <div>Email</div>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <div>Password</div>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button className="button" block disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
            <div className="error">
                {error}
            </div>
        </div>
    );
}