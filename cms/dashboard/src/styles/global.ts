import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./themes";
import "./fonts.css";

type GlobalThemeProps = {
    theme: ThemeProps;
};

export const GlobalStyle = createGlobalStyle`
    :root {
        font-family: 'Poppins';

        //dark
        --dark-background: #141414;
        --dark-text: white;
        --dark-input-background: black;

        //light
        --light-background: white;
        --light-text: black;
    }

    body, html {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }: GlobalThemeProps) => theme.background};
        height: 100%;
    }

    input {
        cursor: inherit;
    }
`;

export default withTheme(GlobalStyle);
