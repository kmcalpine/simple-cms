import { Route, Routes } from "react-router-dom";
import { withLoggedIn, withLoggedOut } from "./withLoggedIn";
import { Login } from "../pages/auth/login/Login";
import { Dashboard } from "../pages/dashboard";
import { Test } from "../pages/Test";
import { Logout } from "../pages/auth/logout";
import { Products } from "../pages/collections/products";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={withLoggedOut(Login)()} />
            <Route path="/logout" element={withLoggedIn(Logout)()} />
            <Route path="/" element={withLoggedIn(Dashboard)()}>
                <Route path="/products" element={withLoggedIn(Products)()} />
                <Route path="/test" element={withLoggedIn(Test)()} />
            </Route>
        </Routes>
    );
};
