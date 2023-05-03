import axios from "axios";

type CreateArgs<T> = {
    slug: string;
    data?: T;
};

type Request = <T>(args?: CreateArgs<T>) => Promise<Response<T>>;
type Response<T> = {
    status: number;
    data: T;
};

const baseURL = "http://localhost:8002";

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export const create: Request = <T>(
    args?: CreateArgs<T>
): Promise<Response<T>> => {
    const res = api.request({
        method: "POST",
        data: {
            ...args?.data
        },
        url: `${baseURL}/${args?.slug}`
    });
    return res;
};
