import { AxiosInstanceProvider } from "./context/Axios";
import { Login } from "./pages/auth/login/Login";
import { ThemeContext } from "./context/Theme";
import { GlobalStyle } from "./styles/global";
import "./App.css";

function App() {
    return (
        <div className="App">
            <ThemeContext>
                <GlobalStyle />
                <AxiosInstanceProvider
                    config={{ baseURL: "http://localhost:8002" }}
                    requestInterceptors={[]}
                    responseInterceptors={[]}
                >
                    <Login />
                </AxiosInstanceProvider>
            </ThemeContext>
        </div>
    );
}

export default App;
