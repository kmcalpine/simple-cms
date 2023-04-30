import styled from "styled-components";

const StyledBreadcrumbs = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
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
