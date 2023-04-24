import styled from "styled-components";

const StyledBreadcrumbs = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    background-color: transparent;
`;

const BreadcrumbContent = styled.div`
    margin: auto 0 auto 0;
    color: var(--theme-elevation-1000);
    font-size: 13px;
    font-weight: bold;
`;

export const Breadcrumbs = () => {
    return (
        <StyledBreadcrumbs>
            <BreadcrumbContent>Breadcrumb</BreadcrumbContent>
        </StyledBreadcrumbs>
    );
};
