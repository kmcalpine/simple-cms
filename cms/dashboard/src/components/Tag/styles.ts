import styled from "styled-components";

export const StyledTag = styled.div`
    display: flex;
    height: 50px;
    border-radius: 3rem;
    background-color: var(--theme-elevation-50);
    border: 1px solid var(--theme-elevation-200);
    padding: 0 1rem;
    margin: 0 0.75rem 0.75rem 0;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--theme-elevation-1000);
    text-align: center;
`;

export const Input = styled.input``;

export const TagText = styled.span`
    margin: auto 0;
`;

export const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
    padding: 0;
`;

export const TagWrapper = styled.div``;

export const TagTitle = styled.div`
    color: var(--theme-elevation-800);
    font-size: 14px;
    margin-bottom: 10px;
`;

export const TagInput = styled.input`
    background-color: transparent;
    border: none;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--theme-elevation-1000);
    text-align: center;
    &:focus {
        outline: none;
    }
`;

export const AddTag = styled.button`
    height: 50px;
    padding: 0 1.2rem;
    border-radius: 3rem;
    background-color: var(--theme-success-500);
    border: none;
    font-size: 0.9rem;
    font-weight: bold;
    color: black;

    &:hover {
        cursor: pointer;
    }
`;

export const DelTagButton = styled.button`
    margin: auto 0 auto 0.5rem;
    background-color: var(--theme-error-500);
    height: 1rem;
    width: 1rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    color: var(--theme-elevation-0);
    &:hover {
        cursor: pointer;
    }
`;
