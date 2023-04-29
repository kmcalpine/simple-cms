import { Route, Routes } from "react-router-dom";
import { withLoggedIn, withLoggedOut } from "./withLoggedIn";
import { Login } from "../pages/auth/login/Login";
import { Dashboard } from "../pages/Dashboard";
import { Store } from "../pages/Store";
import { Test } from "../pages/Test";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={withLoggedOut(Login)()} />
            <Route path="/" element={withLoggedIn(Dashboard)()}>
                <Route path="/store" element={withLoggedIn(Store)()} />
                <Route path="/test" element={withLoggedIn(Test)()} />
            </Route>
        </Routes>
    );
};
