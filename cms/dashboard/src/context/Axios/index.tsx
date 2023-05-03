import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createContext, useRef, ReactNode } from "react";
import getCookie from "../../utils/getCookie";
import {
    Request,
    Response,
    CreateArgs,
    IAxiosContext
} from "../../types/api.ts";

export const AxiosContext = createContext<IAxiosContext>({} as IAxiosContext);
export const AxiosInstanceProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const baseURL = "http://localhost:8002";

    const api = useRef<AxiosInstance>(
        axios.create({
            baseURL: "http://localhost:8002",
            withCredentials: false
        })
    );

    api.current.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token === null) return config;
        config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        return config;
    });

    const get: Request = <T,>(args?: any): Promise<Response<T>> => {
        const res = api.current.request({
            method: "GET",
            url: `${baseURL}/${args.slug}`
        });
        return res;
    };

    const create: Request = <T, U>(
        args?: CreateArgs<T>
    ): Promise<AxiosResponse<U>> => {
        const res = api.current.request({
            method: "POST",
            data: {
                ...args?.data
            },
            url: `${baseURL}/${args?.slug}`
        });
        return res;
    };

    return (
        <AxiosContext.Provider value={{ api, create, get }}>
            {children}
        </AxiosContext.Provider>
    );
};
