import styled from "styled-components";
import { StyledTitle } from "../styles/global";

const StyledStore = styled.div`
    display: flex;
    flex-grow: 1;
    height: 3000px;
    background-color: var(--theme-elevation-0);
    color: var(--theme-elevation-1000);
    padding: 40px 0 40px 0;
`;

export const Store = () => {
    return (
        <StyledStore>
            <StyledTitle>Store</StyledTitle>
        </StyledStore>
    );
};
