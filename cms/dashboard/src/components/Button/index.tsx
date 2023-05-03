import styled from "styled-components";

interface IProps {
    text: string;
    loading?: boolean;
}

const StyledButton = styled.button<{ $loading: boolean }>`
    background-color: ${(props) =>
        props.$loading
            ? "var(--theme-elevation-800)"
            : "var(--theme-elevation-1000)"};
    border: none;
    cursor: ${(props) => (props.$loading ? "auto" : "pointer")};
    padding: 14px;
    width: 100%;
    height: 50px;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: var(--theme-elevation-800);
    }
`;

const Text = styled.span`
    color: var(--theme-elevation-0);
    font-size: 14px;
    font-weight: bold;
`;

export const Button = ({ text, loading }: IProps) => {
    return (
        // @ts-ignore
        <StyledButton $loading={loading} type="submit">
            {loading ? "loading" : <Text>{text}</Text>}
        </StyledButton>
    );
};
