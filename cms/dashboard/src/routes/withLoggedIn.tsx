import { FunctionComponent, useContext } from "react";
import { withCondition } from "./withCondition";
import { useAuth } from "../context/Auth";

export const withLoggedIn = (Component: FunctionComponent) => {
    return withCondition(Component, useAuth().authenticated, "/login");
};

export const withLoggedOut = (Component: FunctionComponent) =>
    withCondition(Component, !useAuth().authenticated, "/");
