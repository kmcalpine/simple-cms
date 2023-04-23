import { AxiosInstanceProvider } from "./context/Axios";
import { GlobalStyle } from "./styles/global";
import { ThemeProps, darkTheme, lightTheme } from "./styles/themes";
import { ThemeProvider } from "styled-components";
import { createContext } from "react";
import { useThemeMode } from "./hooks/useThemeMode";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/Routes";
import { UserProvider } from "./context/User";

interface ThemesMap {
    [theme: string]: ThemeProps;
}

export const ThemePreferenceContext = createContext<any>(null);
export const themesMap: ThemesMap = {
    light: lightTheme,
    dark: darkTheme
};

function App() {
    const { theme, themeToggle } = useThemeMode();
    const currentTheme = themesMap[theme];

    return (
        <div className="App">
            <ThemeProvider theme={currentTheme}>
                <GlobalStyle />
                <ThemePreferenceContext.Provider value={{ theme, themeToggle }}>
                    <AxiosInstanceProvider
                        config={{ baseURL: "http://localhost:8002" }}
                        requestInterceptors={[]}
                        responseInterceptors={[]}
                    >
                        <BrowserRouter>
                            <UserProvider>
                                <AppRoutes />
                            </UserProvider>
                        </BrowserRouter>
                    </AxiosInstanceProvider>
                </ThemePreferenceContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
