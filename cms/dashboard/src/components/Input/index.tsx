import styled from "styled-components";
import { useState } from "react";
import React from "react";

interface IProps {
    title: string;
    value: string;
    handleInputChange: any;
    type: string | undefined;
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
`;

const InputTitle = styled.div`
    color: var(--theme-elevation-800);
    font-size: 14px;
    margin-bottom: 10px;
`;

const StyledInput = styled.input`
    border: none;
    background-color: var(--theme-input-bg);
    border: solid 1px #3c3c3c;
    font-size: calc(20px * 0.75);
    line-height: 20px;
    color: #a8a8a8;
    height: 50px;
    padding: 0 14px 0 14px;
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

export const Input = ({ title, value, handleInputChange, type }: IProps) => {
    return (
        <InputWrapper>
            <InputTitle>
                {title}
                <span style={{ color: "red" }}> *</span>
            </InputTitle>
            <StyledInput
                value={value}
                onChange={handleInputChange}
                type={type}
            />
        </InputWrapper>
    );
};
