import styled from "styled-components";

export const ProductWrapper = styled.div`
    width: 100%;
    height: 12rem;
    background-color: var(--theme-elevation-50);
    margin: 0 0 0 0;
    display: inline-grid;
    grid-template-columns: 12rem 1fr 0.5fr;
`;

export const ProductImage = styled.img`
    height: 12rem;
    width: 12rem;
`;
export const ProductTitle = styled.div`
    color: var(--theme-elevation-900);
    margin: auto 0;
    padding: 0 3rem;
`;
export const Options = styled.div`
    color: var(--theme-elevation-900);
    margin: auto 0 auto auto;
    padding: 0 3rem;
`;
