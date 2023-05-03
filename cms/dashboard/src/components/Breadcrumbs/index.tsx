import styled from "styled-components";

const StyledBreadcrumbs = styled.div`
    z-index: 50;
    height: 80px;
    width: calc(100% - 28rem);
    display: flex;
    position: sticky;
    top: 0;
    background-color: var(--theme-elevation-0);
    border-left: 1px solid var(--theme-elevation-100);
`;

const BreadcrumbContent = styled.div`
    margin: auto 0 auto 0;
    padding: 0 8rem;
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
