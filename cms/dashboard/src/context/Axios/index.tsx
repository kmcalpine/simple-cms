//https://blog.openreplay.com/integrating-axios-with-react-hooks/
import axios, { AxiosInstance } from "axios";
import { createContext, useEffect, useRef, ReactNode } from "react";

export const AxiosContext = createContext<AxiosInstance | null>(null);
export const AxiosInstanceProvider = ({
    config = {},
    requestInterceptors = [],
    responseInterceptors = [],
    children
}: {
    config: object;
    requestInterceptors: [];
    responseInterceptors: [];
    children: ReactNode;
}) => {
    const instanceRef = useRef<AxiosInstance>(axios.create(config));
    instanceRef.current.interceptors.request.use((config) => {
        const csrf_token: string = "31041263-34f9-4171-8556-6ba1ebb2dc99";
        config.headers["csrf_token"] = csrf_token;
        return config;
    });

    useEffect(() => {
        requestInterceptors.forEach((interceptor) => {
            instanceRef.current.interceptors.request.use(interceptor);
        });
        responseInterceptors.forEach((interceptor) => {
            instanceRef.current.interceptors.response.use(interceptor);
        });
    }, []);

    return (
        <AxiosContext.Provider value={instanceRef.current}>
            {children}
        </AxiosContext.Provider>
    );
};
