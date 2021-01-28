import {createContext, useContext} from 'react';

export const AuthContext = createContext(
    {
        authenticated: false,
        email: undefined,
        set: function(auth, email) {
            this.authenticated = auth
            this.email = email
        }
    });

export function useAuth() {
    return useContext(AuthContext);
}