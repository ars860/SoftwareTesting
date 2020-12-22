import React from "react";
import {Route} from "react-router-dom";
import {useAuth} from "./context/auth";

function PrivateRoute({children: child, ...rest}) {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                auth.authenticated ? (
                    child
                ) : (
                    <div>No log in</div>
                )
            }
        />
    );
}

export default PrivateRoute;