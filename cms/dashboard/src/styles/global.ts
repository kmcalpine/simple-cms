import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./themes";
import "./fonts.css";
import "./colors.css";
import styled from "styled-components";

type GlobalThemeProps = {
    theme: ThemeProps;
};

export const StyledTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: var(--theme-elevation-1000);
`;

export const GlobalStyle = createGlobalStyle`
    :root {
        font-family: 'Poppins';
        padding: 0;
        height: 100%;

        --theme-bg: var(--theme-elevation-0);
        --theme-text: var(--theme-elevation-800);
        --theme-input-bg: var(--theme-elevation-0);
    }

    #root {
        height: 100%;
        width: 100%;
        display: flex;
    }

    body {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    html {
        @extend %body;
        height: 100%;
        background: var(--theme-bg);

        &[data-theme="dark"] {
            --theme-bg: var(--theme-elevation-0);
            --theme-text: var(--theme-elevation-1000);
            --theme-input-bg: var(--theme-elevation-50);
        }
    }

    .App {
        width: 100%;
        display: flex;
    }
`;

export default withTheme(GlobalStyle);
