import styled from "styled-components";

interface IProps {
    text: string;
    type?: "button" | "submit" | "reset" | undefined;
    loading?: boolean;
}

const StyledButton = styled.button`
    background-color: var(--theme-elevation-1000);
    border: none;
    cursor: pointer;
    padding: 14px;
    width: 100%;
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

export const Button = ({ text, type, loading = false }: IProps) => {
    return (
        <StyledButton type={type}>
            {loading ? "loading" : <Text>{text}</Text>}
        </StyledButton>
    );
};
