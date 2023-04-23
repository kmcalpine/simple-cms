import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SideNav } from "../components/SideNav";

const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
`;

const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
`;

const DashboardContent = ({ Component }: { Component: FunctionComponent }) => {
    return <Component />;
};

export const Dashboard = () => {
    const [component, _setComponent] = useState(() => <></>);
    const setComponent = (newComponent: any) => {
        _setComponent(newComponent);
    };
    return (
        <StyledDashboard>
            <ContentWrapper>
                <SideNav handleClick={setComponent} />
                <DashboardContent
                    Component={() => component}
                ></DashboardContent>
            </ContentWrapper>
        </StyledDashboard>
    );
};
