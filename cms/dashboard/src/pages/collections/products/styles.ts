import styled, { StyledComponent } from "styled-components";

export const Layout = styled.div``;
export const Title = styled.h1`
    font-size: 3rem;
    color: var(--theme-elevation-1000);
`;
export const TitleRow = styled.div`
    display: flex;
`;
export const CreateWrapper = styled.div`
    display: flex;
    margin: auto 0 auto 1.5rem;
    padding: 0 0.8rem;
    height: 2.5rem;
    border-radius: 2rem;
    background-color: var(--theme-elevation-200);
    &:hover {
        background-color: var(--theme-elevation-100);
    }
`;
export const Create = styled.a`
    margin: auto 0;
    color: var(--theme-elevation-1000);
    text-decoration: none;
    font-size: 0.9rem;
`;
export const ProductListContainer = styled.div`
    width: 100%;
    height: 100%;
`;
