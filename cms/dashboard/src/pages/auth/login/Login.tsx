import {Input} from "../../../components/Input"
import styled from 'styled-components'
import { device } from "../../../utils/breakpoints"

const Title = styled.div`
    color: white;
    font-size: 40px;
    margin-bottom: 40px;
`

const Form = styled.form`

    width: 100%;
    max-width: 500px;
    margin-top: auto;

`

export function Login() {
    return (
        <Form>
            <Title>Login</Title>
            <Input title="Email"/>
            <Input title="Password"/>
        </Form>
    )
}