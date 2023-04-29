import axios, { AxiosInstance } from "axios";
import { createContext, useRef, ReactNode } from "react";
import getCookie from "../../utils/getCookie";
import { useAuth } from "../Auth";

export const AxiosContext = createContext<AxiosInstance>({} as AxiosInstance);
export const AxiosInstanceProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const { authenticated } = useAuth();

    const instanceRef = useRef<AxiosInstance>(
        axios.create({
            baseURL: "http://localhost:8002",
            withCredentials: true
        })
    );

    instanceRef.current.interceptors.request.use((config) => {
        const csrf_token = getCookie("csrf_token");
        config.headers["csrf_token"] = csrf_token;
        return config;
    });

    return (
        <AxiosContext.Provider value={instanceRef.current}>
            {children}
        </AxiosContext.Provider>
    );
};
