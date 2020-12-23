import React from "react";
import {Route} from "react-router-dom";
import {useAuth} from "./context/auth";
import PropTypes from "prop-types";

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

PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;