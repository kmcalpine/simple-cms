import { Route, Routes } from "react-router-dom";
import { withLoggedIn, withLoggedOut } from "./withLoggedIn";
import { Login } from "../pages/auth/login/Login";
import { Dashboard } from "../pages/Dashboard";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={withLoggedOut(Login)()} />
            <Route path="/" element={withLoggedIn(Dashboard)()} />
        </Routes>
    );
};
