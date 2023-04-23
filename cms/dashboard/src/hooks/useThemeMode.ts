import { useEffect, useState } from "react";

export const useThemeMode = () => {
    const [theme, setTheme] = useState("dark");

    const setMode = (mode: string) => {
        window.localStorage.setItem("theme", mode);
        setTheme(mode);
    };

    const themeToggle = () =>
        theme === "dark" ? setMode("light") : setMode("dark");

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        localTheme && setTheme(localTheme);
        const html = document.querySelector("html");
        localTheme && html!.setAttribute("data-theme", localTheme);

        return () => {
            const html = document.querySelector("html");
            html?.removeAttribute("data-theme");
        };
    }, [theme]);

    return { theme, themeToggle };
};
