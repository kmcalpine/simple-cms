import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
    children: ReactNode;
}

const StyledDiv = styled.div`
    display: flex;
    height: 100%;
    background-color: transparent;
`;

export const Public = ({ children }: IProps) => {
    return <StyledDiv>{children}</StyledDiv>;
};
