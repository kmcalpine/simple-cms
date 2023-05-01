import { useEffect } from "react";
import { useAuth } from "../../../context/Auth";

export const Logout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        const _logout = async () => {
            await logout();
        };
        _logout();
    });

    return <></>;
};
