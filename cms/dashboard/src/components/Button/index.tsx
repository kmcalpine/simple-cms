import styled from "styled-components"

interface IProps {
    text: string
    type?: "button" | "submit" | "reset" | undefined
}

const StyledButton = styled.button`
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 14px;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: #dadada;
    }
`

const Text = styled.span`
    color: black;
    font-size: 14px;
`

export const Button = ({text, type}: IProps) => {
    return (
        <StyledButton type={type}>
            <Text>{text}</Text>
        </StyledButton>
    )
}