import { AxiosInstance } from "axios";
import { MutableRefObject } from "react";

export type CreateArgs<T> = {
    slug: string;
    data?: T;
};

export type Request = <T, U>(args?: CreateArgs<T>) => Promise<Response<U>>;
export type Response<U> = {
    status: number;
    data: U;
};

export interface IAxiosContext {
    api: MutableRefObject<AxiosInstance>;
    create: Request;
    get: Request;
}
