import { FunctionComponent, useContext } from "react";
import { withCondition } from "./withCondition";
import { UserContext } from "../context/User";
import { useAuth } from "../context/Auth";

export const withLoggedIn = (Component: FunctionComponent) => {
    console.log(useAuth().authenticated);
    return withCondition(Component, useAuth().authenticated, "/login");
};

export const withLoggedOut = (Component: FunctionComponent) =>
    withCondition(Component, !useAuth().authenticated, "/");
