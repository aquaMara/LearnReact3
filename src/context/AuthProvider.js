import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={
            {
                auth, setAuth
            }
        }>
            {children}
            {console.log("auth in AuthContext", auth.username)}
        </AuthContext.Provider>
    )
}

export default AuthContext;