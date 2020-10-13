import React, {useState} from 'react';
import './App.css';
import Counter from "./Counter";
import Header from "./Header"
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import Login from "./Login";
import {AuthContext} from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Logout from "./Logout"
import Blog from "./blog/Blog";


function App() {
    const [authenticated, setAuthenticated] = useState(true)
    const [email, setEmail] = useState("undefined")

    return (
        <AuthContext.Provider value={{
            authenticated: authenticated, email: email, set: function (a, e) {
                setEmail(e);
                setAuthenticated(a);
            }
        }}>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route exact path='/login'>
                            <Login/>
                        </Route>
                        <PrivateRoute exact path='/counter'>
                            <Counter/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/logout">
                            <Logout/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/blog">
                            <Blog/>
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
