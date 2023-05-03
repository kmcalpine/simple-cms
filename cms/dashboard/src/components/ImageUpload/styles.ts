import styled from "styled-components";

export const ImgWrapper = styled.div`
    position: relative;
    display: flex;
    margin: 0 1rem 1rem 0;
`;

export const Img = styled.img`
    height: 15rem;
    overflow: hidden;
    box-shadow: 0 2px 3px 0 rgba(0, 2, 4, 0.15),
        0 10px 4px -8px rgba(0, 2, 4, 0.1);
`;

export const DelImage = styled.button`
    height: 2rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 2rem;
    border-radius: 1rem;
    background-color: var(--theme-error-500);
    outline: none;
    border: none;
`;

export const TagImage = styled.button`
    height: 2rem;
    position: absolute;
    left: 0.5rem;
    bottom: 1rem;
    border-radius: 1rem;
    background-color: var(--theme-elevation-1000);
    color: var(--theme-elevation-0);
    outline: none;
    border: none;
    padding: 0 1rem;
`;

export const ImageUploadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2rem 0 0 0;
`;

export const Title = styled.div`
    color: var(--theme-elevation-800);
    font-size: 14px;
    margin-bottom: 10px;
`;

export const UploadInput = styled.input`
    &:before {
        content: "Upload image";
    }
    &::-webkit-file-upload-button {
        visibility: hidden;
    }
    height: 15rem;
    min-width: 5rem;
    max-width: 11rem;
    border-radius: 1rem;
    background-color: var(--theme-elevation-100);
    border: none;
    outline: none;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    padding: 0;
    border: 1px solid var(--theme-elevation-200);

    &:hover {
        border: 1px solid var(--theme-elevation-300);
    }
`;

export const Span = styled.span`
    position: absolute;
    z-index: 50;
`;

export const Input = styled.input`
    margin: 0;
    width: 100%;
    border: none;
    background-color: var(--theme-input-bg);
    border: solid 1px #3c3c3c;
    font-size: calc(20px * 0.75);
    color: var(--theme-elevation-800);
    height: 50px;
    padding: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        border: solid 1px #5c5c5c;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
        -webkit-font-size: 15px;
    }
`;
