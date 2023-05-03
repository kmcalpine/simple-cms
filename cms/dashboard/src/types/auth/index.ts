export type Login = (args: { email: string; password: string }) => Promise<any>;

export type Logout = () => Promise<void>;

export type LoginArgs = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type IAuthContext = {
    authenticated: boolean;
    login: Login;
    logout: Logout;
};
