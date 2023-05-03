import styled from "styled-components";
import { useEffect, useState } from "react";
import React from "react";

interface IProps {
    title?: string;
    path: string;
    type: "password" | "text" | "textarea" | "file";
    handleChange?: (e: any) => void;
    defaultValue?: string;
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
    background-color: var(--theme-elevation-0);
    border: solid 1px var(--theme-elevation-300);
    font-size: calc(20px * 0.75);
    color: var(--theme-elevation-800);
    height: 50px;
    padding: 0 14px 0 14px;
    box-shadow: 0 2px 3px 0 rgba(0, 2, 4, 0.05),
        0 10px 4px -8px rgba(0, 2, 4, 0.02);
    &:focus {
        outline: none;
    }
    &:hover {
        border: solid 1px var(--theme-elevation-400);
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

export const Input = ({
    title,
    path,
    type,
    handleChange,
    defaultValue
}: IProps) => {
    const [value, setValue] = useState<string>(() => {
        return defaultValue || "";
    });

    useEffect(() => {
        setValue(defaultValue || "");
    }, [defaultValue]);

    const textArea = type === "textarea";
    return (
        <InputWrapper>
            {title && <InputTitle>{title}</InputTitle>}
            {textArea && <StyledTextArea name={path} id={path} />}
            {!textArea && (
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
                        if (path === "image") return;
                        if (e.key === "Enter") {
                            setValue("");
                        }
                    }}
                />
            )}
        </InputWrapper>
    );
};
