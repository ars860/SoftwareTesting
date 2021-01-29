// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import Counter from "./Counter";
import Header from "./Header"
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import Login from "./Login";
import {AuthContext} from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Logout from "./Logout"
import Blog from "./blog/Blog";
import NotFound from "./NotFound";


function App() {
    let localState = window.localStorage.getItem("user")

    const [authenticated, setAuthenticated] = useState(localState === null ? false : localState !== undefined)
    const [email, setEmail] = useState(localState)

    useEffect(() => {
        if (email === null) {
            return
        }
        if (email === undefined) {
            console.log("remove")
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", email)
            setAuthenticated(true)
        }
    }, [email])

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
                        <Route exact path={['/login', '']}>
                            <Login register={false}/>
                        </Route>
                        <Route exact key='1' path='/register'>
                            <Login register={true}/>
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
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
