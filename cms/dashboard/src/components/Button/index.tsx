import styled from "styled-components"

interface IProps {
    text: string
    type?: "button" | "submit" | "reset" | undefined
    loading?: boolean
}

const StyledButton = styled.button`
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 14px;
    width: 100%;
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
    font-weight: bold;
`

export const Button = ({text, type, loading = false}: IProps) => {
    return (
        <StyledButton type={type}>
            {loading ? 'loading' : <Text>{text}</Text>}
        </StyledButton>
    )
}