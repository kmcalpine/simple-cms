import styled from "styled-components";

const StyledStore = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    background-color: var(--theme-elevation-0);
    color: var(--theme-elevation-1000);
`;

const StoreContent = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
    margin: 40px;
`;

export const Store = () => {
    return (
        <StyledStore>
            <StoreContent></StoreContent>
        </StyledStore>
    );
};
