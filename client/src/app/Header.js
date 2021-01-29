import React, {Fragment} from 'react';
import logo from "../images/logo.svg";
import {Link} from "react-router-dom";
import '../styles/Header.css'
import {useAuth} from "./context/auth";

function Header() {
    const auth = useAuth()

    return (
        <div className="Header">
            {!auth.authenticated &&
            <Fragment>
                <div className="MenuItem">
                    <Link to="/login" id="loginLink">
                        Login
                    </Link>
                </div>
                <div className="MenuItem">
                    <Link to="/register" id="registerLink">
                        Register
                    </Link>
                </div>
            </Fragment>
            }
            {auth.authenticated &&
            <Fragment>
                <div className="MenuItem">
                    <Link to="/counter" id="counterLink">
                        Counter
                    </Link>
                </div>
                <div className="MenuItem">
                    <Link to="/blog" id="blogLink">
                        Blog o testirovanii
                    </Link>
                </div>
                <div className="MenuItem" id="email">
                    {auth.email}
                </div>
                <div className="MenuItem">
                    <Link to="/logout" id="logoutLink">
                        Logout
                    </Link>
                </div>
            </Fragment>
            }
            <div className="MenuItem Logo">
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        </div>
    )
}

export default Header;