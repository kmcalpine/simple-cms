import { Outlet } from "react-router-dom";
import { SideNav } from "../../components/SideNav";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
    StyledDashboard,
    ContentWrapper,
    NavWrapper,
    DashboardWrapper,
    DashboardContainer
} from "./styles";

export const Dashboard = () => {
    return (
        <StyledDashboard>
            <ContentWrapper>
                <NavWrapper>
                    <SideNav />
                </NavWrapper>
                <DashboardWrapper>
                    <DashboardContainer>
                        <Breadcrumbs />
                        <Outlet />
                    </DashboardContainer>
                </DashboardWrapper>
            </ContentWrapper>
        </StyledDashboard>
    );
};
