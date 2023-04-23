import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

export const withCondition = (
    Component: FunctionComponent,
    condition: boolean,
    redirectTo: string
) => {
    return (props?: any) => {
        return condition ? (
            <Component {...props} />
        ) : (
            <Navigate to={redirectTo} replace />
        );
    };
};
