import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { device } from "../../../utils/breakpoints";
import { ThemePreferenceContext, themesMap } from "../../../App";
import { Public } from "../../public";
import { UserContext } from "../../../context/User";

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

export function Login() {
    // useeffect on get reqs
    const { data, error, loading, processRequest } = useAxios();
    const { theme, themeToggle } = useContext(ThemePreferenceContext);
    const { loggedIn, login, logout } = useContext(UserContext);

    const submitForm = () => {
        console.log(formData);
        processRequest("/ping", "POST", formData);
        login();
    };

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    return (
        <Public>
            <Form
                onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <Title>Login</Title>
                <Input
                    title="Email"
                    value={formData.email}
                    type="text"
                    handleInputChange={(e: React.SyntheticEvent) => {
                        setFormData({
                            ...formData,
                            email: (e.target as HTMLInputElement).value
                        });
                    }}
                />
                <Input
                    title="Password"
                    value={formData.password}
                    type="password"
                    handleInputChange={(e: React.SyntheticEvent) => {
                        setFormData({
                            ...formData,
                            password: (e.target as HTMLInputElement).value
                        });
                    }}
                />
                <Button text="LOG IN" type="submit" loading={loading} />
            </Form>
        </Public>
    );
}
