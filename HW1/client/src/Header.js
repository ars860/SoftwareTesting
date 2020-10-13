import React, {useEffect} from 'react';
import logo from "./logo.svg";
import {Link} from "react-router-dom";
import './Header.css'
import {useAuth} from "./context/auth";

function Header() {
    const auth = useAuth()

    return (
        <div className="Header">
            <div className="MenuItem">
                <Link to="/counter">
                    Counter
                </Link>
            </div>
            <div className="MenuItem">
                <Link to="/login">
                    Login
                </Link>
            </div>
            {auth.authenticated &&
            <div className="MenuItem">
                <Link to="/blog">
                    Blog o testirovanii
                </Link>
            </div>
            }
            {auth.authenticated &&
            <div className="MenuItem">
                {auth.email}
            </div>
            }
            {auth.authenticated &&
            <div className="MenuItem">
                <Link to="/logout">
                    Logout
                </Link>
            </div>
            }
            <div className="MenuItem Logo">
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        </div>
    )
}

export default Header;