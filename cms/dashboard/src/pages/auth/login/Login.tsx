import {Input} from "../../../components/Input"
import { Button } from "../../../components/Button"
import styled from 'styled-components'
import React, { useState, useMemo } from "react"
import { useAxios } from "../../../hooks/useAxios"

interface FormData {
    email: string
    password: string
}

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
    // useeffect on get reqs
    const { data, error, loading, processRequest } = useAxios()
    const submitForm = () => {
        console.log(formData)
        processRequest(
        "/ping",
        "POST",
        formData
    )}



    const [ formData, setFormData ] = useState<FormData>({
        email: '',
        password: ''
    })

    return (
        <Form
            onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                submitForm()
            }}
        >
            <Title>Login</Title>
            <Input title="Email" value={formData.email} handleInputChange={(e: React.SyntheticEvent) => {
                setFormData({...formData, email: (e.target as HTMLInputElement).value})
            }}/>
            <Input title="Password" value={formData.password} handleInputChange={(e: React.SyntheticEvent) => {
                setFormData({...formData, password: (e.target as HTMLInputElement).value})
            }}/>
            <Button text="LOG IN" type="submit" />
        </Form>
    )
}