import styled from "styled-components";
import { useState } from "react";
import React from "react";

interface IProps {
    title: string;
    path: string;
    type: "password" | "text" | "textarea";
    handleChange?: (e: any) => void;
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

const StyledTextArea = styled.textarea`
    display: flex;
    border: none;
    background-color: var(--theme-input-bg);
    border: solid 1px #3c3c3c;
    font-size: calc(20px * 0.75);
    color: var(--theme-elevation-800);
    height: 15rem;
    padding: 14px 14px 14px 14px;
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

const StyledInput = styled.input`
    display: flex;
    border: none;
    background-color: var(--theme-input-bg);
    border: solid 1px #3c3c3c;
    font-size: calc(20px * 0.75);
    color: var(--theme-elevation-800);
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

export const Input = ({ title, path, type, handleChange }: IProps) => {
    const [value, setValue] = useState("");
    return (
        <InputWrapper>
            <InputTitle>{title}</InputTitle>
            {type === "textarea" ? (
                <StyledTextArea name={path} id={path} />
            ) : (
                <StyledInput
                    value={value}
                    type={type}
                    name={path}
                    id={path}
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleChange!(e);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            setValue("");
                        }
                    }}
                />
            )}
        </InputWrapper>
    );
};
