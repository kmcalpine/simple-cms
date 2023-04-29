import React, {
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect
} from "react";
import { AxiosContext } from "../Axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Login = (args: { email: string; password: string }) => Promise<any>;

type Logout = () => Promise<void>;

type AuthContext = {
    authenticated: boolean;
    login: Login;
    logout: Logout;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [authenticated, setAuthenticated] = useLocalStorage<boolean>(
        "authenticated",
        false
    );

    const api = useContext(AxiosContext);

    const login = useCallback<Login>(async (args) => {
        try {
            await api
                .request({
                    method: "POST",
                    data: {
                        email: args.email,
                        password: args.password
                    },
                    url: "/auth/login"
                })
                .then((res) => {
                    if (res.status === 200) {
                        setAuthenticated(true);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const logout = useCallback<Logout>(async () => {}, []);

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

type UseAuth<T = string> = () => AuthContext;

export const useAuth: UseAuth = () => useContext(Context);
