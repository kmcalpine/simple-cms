import styled from "styled-components";
import { device } from "../../utils/breakpoints";

export const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

export const NavWrapper = styled.div`
    @media ${device.mobileS} {
        height: 80px;
        display: block;
        width: 100%;
    }
    @media ${device.tablet} {
        height: 100%;
        min-width: 220px;
        max-width: 220px;
        display: block;
    }
`;

export const ContentWrapper = styled.div`
    height: 100%;
    @media ${device.mobileS} {
        flex-direction: column;
    }
    @media ${device.tablet} {
        height: 100%;
        display: flex;
        flex-direction: row;
    }
`;

export const DashboardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 25px;
    margin: 0 100px 0 100px;
`;

export const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

    @media ${device.mobileS} {
        padding: 0 1.5rem;
    }
    @media ${device.tablet} {
        padding: 0 5rem;
        width: 100%;
    }
`;

export const DashboardContainer = styled.div`
    background-color: transparent;
    @media ${device.mobileS} {
        width: 100%;
    }
    @media ${device.tablet} and (max-width: 700px) {
        width: 700px;
    }
`;
