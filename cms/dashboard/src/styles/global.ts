import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./themes";
import "./fonts.css";
import "./colors.css";

type GlobalThemeProps = {
    theme: ThemeProps;
};

export const GlobalStyle = createGlobalStyle`
    :root {
        font-family: 'Poppins';

        --theme-bg: var(--theme-elevation-0);
        --theme-text: var(--theme-elevation-800);
        --theme-input-bg: var(--theme-elevation-0);
    }

    html {
        @extend %body;
        background: var(--theme-bg);

        &[data-theme="dark"] {
            --theme-bg: var(--theme-elevation-0);
            --theme-text: var(--theme-elevation-1000);
            --theme-input-bg: var(--theme-elevation-50);
        }
    }
`;

export default withTheme(GlobalStyle);
