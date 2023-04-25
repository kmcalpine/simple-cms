import styled from "styled-components";
import { FunctionComponent, useState } from "react";
import { SideNav } from "../components/SideNav";
import { Breadcrumbs } from "../components/Breadcrumbs";

const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
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
`;

const ComponentWrapper = styled.div`
    display: flex;
`;

const DashboardContent = ({ Component }: { Component: FunctionComponent }) => {
    return (
        <DashboardContentWrapper>
            <Breadcrumbs />
            <ComponentWrapper>
                <Component />
            </ComponentWrapper>
        </DashboardContentWrapper>
    );
};

export const Dashboard = () => {
    // update to base dashboard content for default component state
    const [component, _setComponent] = useState(() => <></>);
    const setComponent = (newComponent: any) => {
        _setComponent(newComponent);
    };
    return (
        <StyledDashboard>
            <ContentWrapper>
                <NavWrapper>
                    <SideNav handleClick={setComponent} />
                </NavWrapper>
                <DashboardContent
                    Component={() => component}
                ></DashboardContent>
            </ContentWrapper>
        </StyledDashboard>
    );
};