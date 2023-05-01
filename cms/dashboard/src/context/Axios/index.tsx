import axios, { AxiosInstance } from "axios";
import { createContext, useRef, ReactNode, MutableRefObject } from "react";
import getCookie from "../../utils/getCookie";
import { useAuth } from "../Auth";

type CreateArgs<T> = {
    slug: string;
    data?: T;
};

type Request = <T>(args?: CreateArgs<T>) => Promise<Response<T>>;
type Response<T> = {
    status: number;
    data: T;
};

type AxiosContext = {
    api: MutableRefObject<AxiosInstance>;
    create: Request;
    get: Request;
};

export const AxiosContext = createContext<AxiosContext>({} as AxiosContext);
export const AxiosInstanceProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    const baseURL = "http://localhost:8002";

    const api = useRef<AxiosInstance>(
        axios.create({
            baseURL: "http://localhost:8002",
            withCredentials: true
        })
    );

    api.current.interceptors.request.use((config) => {
        const csrf_token = getCookie("csrf_token");
        config.headers["csrf_token"] = csrf_token;
        return config;
    });

    const get: Request = <T,>(args?: any): Promise<Response<T>> => {
        const res = api.current.request({
            method: "GET",
            url: `${baseURL}/${args.slug}`
        });
        return res;
    };

    const create: Request = <T,>(
        args?: CreateArgs<T>
    ): Promise<Response<T>> => {
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
