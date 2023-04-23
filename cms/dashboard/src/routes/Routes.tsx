import { Route, Routes } from "react-router-dom";
import { withLoggedIn, withLoggedOut } from "./withLoggedIn";
import { Login } from "../pages/auth/login/Login";
import { Home } from "../pages/Home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={withLoggedIn(Home)()} />
            <Route path="/login" element={withLoggedOut(Login)()} />
        </Routes>
    );
};
