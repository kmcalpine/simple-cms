import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SideNav } from "../components/SideNav";

const StyledDashboard = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const Store = () => {
    return <div>this is a store</div>;
};

export const Test = () => {
    return <div>this is a test</div>;
};

const DashboardContent = ({ Component }: { Component: FunctionComponent }) => {
    return <Component />;
};

export const Dashboard = () => {
    const [component, _setComponent] = useState(Store);
    const setComponent = (newComponent: any) => {
        _setComponent(newComponent);
    };
    return (
        <StyledDashboard>
            <SideNav handleClick={setComponent} />
            <DashboardContent Component={() => component}></DashboardContent>
        </StyledDashboard>
    );
};
