import { FunctionComponent } from "react";
import styled from "styled-components";
import { Store } from "../../pages/Store";
import { Test } from "../../pages/Test";

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

export const SideNav = ({
    handleClick
}: {
    handleClick: (component: FunctionComponent) => void;
}) => {
    const sideNavMenuItems = [
        {
            id: 1,
            label: "Store",
            Component: Store
        },
        {
            id: 2,
            label: "Test",
            Component: Test
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
                        <SideNavMenuItem
                            key={item.id}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item.Component);
                            }}
                        >
                            {item.label}
                        </SideNavMenuItem>
                    );
                })}
            </SideNavContent>
        </StyledSideNav>
    );
};
