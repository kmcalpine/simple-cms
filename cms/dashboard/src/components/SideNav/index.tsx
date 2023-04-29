import { FunctionComponent } from "react";
import styled from "styled-components";
import { Store } from "../../pages/Store";
import { Test } from "../../pages/Test";
import { Link } from "react-router-dom";

const Logo = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    background-color: transparent;
    padding-bottom: 20px;
`;

const LogoText = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    color: var(--theme-elevation-1000);
    font-size: 20px;
    font-weight: bold;
`;

const StyledSideNav = styled.div`
    display: flex;
    width: 220px;
    height: 100%;
    background-color: var(--theme-elevation-0);
    border-right: 1px solid var(--theme-elevation-100);
`;

const SideNavContent = styled.div`
    padding: 25px;
    width: 100%;
`;

const SideNavTitle = styled.div`
    color: var(--theme-elevation-500);
    font-size: 13px;
    padding-bottom: 10px;
`;

const SideNavMenuItem = styled.div`
    color: var(--theme-elevation-1000);
    font-size: 13px;
    padding-bottom: 8px;
    width: 100%;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const SideNav = () => {
    const sideNavMenuItems = [
        {
            id: 1,
            label: "Store",
            path: "/store"
        },
        {
            id: 2,
            label: "Test",
            path: "/test"
        }
    ];

    return (
        <StyledSideNav>
            <SideNavContent>
                <Logo>
                    <LogoText>MLD</LogoText>
                </Logo>
                <SideNavTitle>Content</SideNavTitle>
                {sideNavMenuItems.map((item) => {
                    return (
                        <Link to={item.path} key={item.id}>
                            {item.label}
                        </Link>
                    );
                })}
            </SideNavContent>
        </StyledSideNav>
    );
};
