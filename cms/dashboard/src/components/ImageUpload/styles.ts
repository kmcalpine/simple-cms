import styled from "styled-components";

export const ImgWrapper = styled.div`
    position: relative;
    display: flex;
    margin: 0 1rem 1rem 0;
`;

export const Img = styled.img`
    height: 15rem;
    overflow: hidden;
    border-radius: 1rem;
`;

export const DelImage = styled.button`
    height: 2rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 2rem;
    border-radius: 1rem;
    background-color: var(--theme-elevation-0);
    outline: none;
    border: none;
`;

export const ImageUploadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    background-color: var(--theme-elevation-200);
    border: none;
    outline: none;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    padding: 0;
`;
