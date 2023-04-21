import styled from 'styled-components'
import { useState } from 'react'
import React from 'react'

interface IProps {
    title: string,
    value: string
    handleInputChange: any
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const InputTitle = styled.div`
    color: #a8a8a8;
    font-size: 14px;
    margin-bottom: 10px
`

const StyledInput = styled.input`
    border: none;
    background-color: #222222;
    border: solid 1px #3c3c3c;
    font-size: calc(20px*.75);
    line-height: 20px;
    margin-bottom: 20px;
    color: #a8a8a8;
    padding: 14px;
    &:focus {
        outline: none;
    }
`;

export const Input = ({title, value, handleInputChange}: IProps) => {

    return (
        <InputWrapper>
            <InputTitle>
                {title}
                <span style={{color: 'red'}}> *</span>
            </InputTitle>
            <StyledInput
                value={value}
                onChange={handleInputChange}
            />
        </InputWrapper>

    )
}