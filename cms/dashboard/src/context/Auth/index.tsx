import React, { createContext, useContext } from "react";
import { AxiosContext } from "../Axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IAuthContext, LoginArgs, LoginResponse } from "../../types/auth";

const Context = createContext({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [authenticated, setAuthenticated] = useLocalStorage<boolean>(
        "authenticated",
        false
    );
    const [token, setToken] = useLocalStorage<string>("token", "");

    const { create } = useContext(AxiosContext);

    const login = async (args: LoginArgs) => {
        try {
            const loginArgs = {
                data: { ...args },
                slug: "auth/login"
            };
            await create<LoginArgs, LoginResponse>(loginArgs).then((res) => {
                if (res.status === 200) {
                    setAuthenticated(true);
                    setToken(res.data.token);
                }
            });
        } catch (error) {}
    };

    const logout = async () => {
        try {
            const createArgs = {
                data: {},
                slug: "auth/logout"
            };
            await create(createArgs).then((res) => {
                if (res.status === 200) {
                    setAuthenticated(false);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Context.Provider
            value={{
                authenticated,
                login,
                logout
            }}
        >
            {children}
        </Context.Provider>
    );
};

type UseAuth<T = string> = () => IAuthContext;

export const useAuth: UseAuth = () => useContext(Context);
