import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import styled from "styled-components";
import React, { useState, useCallback } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { device } from "../../../utils/breakpoints";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
}

const Title = styled.div`
    color: var(--theme-elevation-1000);
    font-size: 40px;
    margin-bottom: 40px;
    font-weight: bold;
`;

const Form = styled.form`
    width: 100%;
    max-width: 500px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 40px;
    & :nth-child(4) {
        margin-top: 20px;
        height: 50x;

        @media ${device.mobileL} and (min-width: 500px) {
            width: 30%;
        }
        @media (max-width: 600px) {
            width: 100%;
        }
    }
`;

function LoginForm({ onSubmit, loading }: { onSubmit: any; loading: boolean }) {
    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const formDetails = {
            ...Object.fromEntries(formData)
        };
        onSubmit(formDetails);
    }
    return (
        <Form onSubmit={handleSubmit} method="POST">
            <Input title="Email" path="email" type="text" />
            <Input title="Password" path="password" type="password" />
            <Button text="LOG IN" loading={loading} />
        </Form>
    );
}

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(async (data: FormData) => {
        setLoading(true);
        try {
            await login(data);
            navigate("/");
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }, []);

    return <LoginForm onSubmit={handleSubmit} loading={loading} />;
}
