export interface ThemeProps {
    background: string;
    text: string;
    inputBackground: string;
}

export const lightTheme: ThemeProps = {
    background: "var(--theme-bg)",
    text: "var(--light-text)",
    inputBackground: "var(--light-input-background)"
};

export const darkTheme: ThemeProps = {
    background: "var(--theme-bg)",
    text: "var(--dark-text)",
    inputBackground: "var(--dark-input-background)"
};
