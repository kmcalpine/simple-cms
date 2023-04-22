import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/themes";
import { useThemeMode } from "../../hooks/useThemeMode";

interface IProps {
    children: any;
}
export const ThemeContext = ({ children }: IProps) => {
    const { theme } = useThemeMode();
    const themeMode = theme === "dark" ? darkTheme : lightTheme;

    return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};
