import { FunctionComponent } from "react";
import styled from "styled-components";
import { Store } from "../../pages/Store";
import { Test } from "../../pages/Test";
import { Link } from "react-router-dom";
import { device } from "../../utils/breakpoints";

const Logo = styled.div`
    display: flex;
    width: 100%;
    height: 80px;
    background-color: transparent;
    padding-bottom: 1.5rem;
`;

const LogoText = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    color: var(--theme-elevation-1000);
    font-size: 1.4rem;
    font-weight: bold;
`;

const StyledSideNav = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border-right: 1px solid var(--theme-elevation-100);
    @media ${device.mobileS} {
        border-bottom: 1px solid var(--theme-elevation-100);
    }
`;

const SideNavContent = styled.div`
    width: 100%;
    @media ${device.mobileS} {
        padding: 0 1.5rem;
    }
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
`;

const UL = styled.ul`
    list-style: none;
    margin: 0;
    padding 0;
`;

const LinkItem = styled(Link)`
    color: var(--theme-elevation-1000);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const Svg = styled.svg`
    height: 19px;
    margin: auto 0;
    padding-left: 2px;
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

                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="var(--logo-stroke)"
                        strokeWidth={2}
                    >
                        <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
                    </Svg>
                </Logo>
                <SideNavTitle>Content</SideNavTitle>
                <UL>
                    {sideNavMenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <LinkItem to={item.path}>{item.label}</LinkItem>
                            </li>
                        );
                    })}
                </UL>
            </SideNavContent>
        </StyledSideNav>
    );
};
