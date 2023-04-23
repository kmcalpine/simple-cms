import { FunctionComponent, useContext } from "react";
import { withCondition } from "./withCondition";
import { UserContext } from "../context/User";

export const withLoggedIn = (Component: FunctionComponent) =>
    withCondition(Component, useContext(UserContext).loggedIn, "/login");

export const withLoggedOut = (Component: FunctionComponent) =>
    withCondition(Component, !useContext(UserContext).loggedIn, "/");
