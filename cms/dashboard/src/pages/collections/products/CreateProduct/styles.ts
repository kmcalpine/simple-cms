import styled from "styled-components";

export const Form = styled.form`
    margin: 0 0 5rem 0;
    padding: 0 8rem;
    width: 100%;
`;
export const InputWrapper = styled.div`
    width: 50%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding-right: 2rem;
    padding-left: 2rem;
`;

export const StyledButton = styled.button<{ $loading?: boolean }>`
    background-color: ${(props) =>
        props.$loading
            ? "var(--theme-elevation-800)"
            : "var(--theme-elevation-1000)"};
    border: none;
    cursor: ${(props) => (props.$loading ? "auto" : "pointer")};
    padding: 14px;
    width: 100%;
    height: 50px;
    margin-right: 0.5rem;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: var(--theme-elevation-800);
    }
`;

export const CancelButton = styled.button<{ $loading?: boolean }>`
    border: none;
    cursor: ${(props) => (props.$loading ? "auto" : "pointer")};
    padding: 14px;
    width: 100%;
    height: 50px;
    margin-left: 0.5rem;
    background-color: var(--theme-error-100);

    &:focus {
        outline: none;
    }
`;

export const Text = styled.span`
    color: var(--theme-elevation-0);
    font-size: 14px;
    font-weight: bold;
`;

export const CancelText = styled.span`
    color: var(--theme-error-500);
    font-size: 14px;
    font-weight: bold;
`;

export const Main = styled.div`
    width: calc(100% - 28rem);
    height: 100%;
`;

export const RightSideBar = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 28rem;
    border-left: 1px solid var(--theme-elevation-100);
`;
