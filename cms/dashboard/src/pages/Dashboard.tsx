import styled from "styled-components";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/SideNav";
import { Breadcrumbs } from "../components/Breadcrumbs";

const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const NavWrapper = styled.div``;

const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
`;

const DashboardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 25px;
    margin: 0 100px 0 100px;
    height: 3000px;
    overflow: scroll;
`;

const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const DashboardContainer = styled.div`
    width: 100%;
    background-color: var(--theme-elevation-0);
`;

export const Dashboard = () => {
    return (
        <StyledDashboard>
            <ContentWrapper>
                <NavWrapper>
                    <SideNav />
                </NavWrapper>
                <DashboardWrapper>
                    <Breadcrumbs />
                    <DashboardContainer>
                        <Outlet />
                    </DashboardContainer>
                </DashboardWrapper>
            </ContentWrapper>
        </StyledDashboard>
    );
};
