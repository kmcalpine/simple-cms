import styled from "styled-components";
import { StyledTitle } from "../styles/global";

const StyledStore = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    background-color: var(--theme-elevation-0);
    color: var(--theme-elevation-1000);
    padding: 40px 0 40px 0;
`;

const StoreContent = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
`;

export const Store = () => {
    return (
        <StyledStore>
            <StoreContent>
                <StyledTitle>Store</StyledTitle>
            </StoreContent>
        </StyledStore>
    );
};
