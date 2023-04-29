import { createContext, ReactNode, useEffect, useState } from "react";

export const DefaultUserContext = {
    loggedIn: false,
    login: () => {},
    logout: () => {}
};

export const UserContext = createContext(DefaultUserContext);

export const UserProvider = ({ children }: { children?: ReactNode }) => {
    const [loggedIn, _setLoggedIn] = useState(false);
    const setLoggedIn = (val: boolean) => {
        return _setLoggedIn(val);
    };

    const login = () => {
        setLoggedIn(true);
    };
    const logout = () => setLoggedIn(false);

    return (
        <UserContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
