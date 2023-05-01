import { Form, InputWrapper } from "./styles";
import { Layout, TitleRow, Title } from "../styles";
import { Input } from "../../../../components/Input";
import { Tags } from "../../../../components/Tag";
import { useState } from "react";
import { TagProvider } from "../../../../components/Tag/Context";

export const CreateProduct = () => {
    const [title, setTitle] = useState("[undefined]");
    return (
        <Layout>
            <TitleRow>
                <Title>{title}</Title>
            </TitleRow>
            <Form>
                <Input
                    title="Title"
                    path="title"
                    type="text"
                    handleChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <Input title="Description" path="description" type="textarea" />
                <InputWrapper>
                    <Input title="Price" path="price" type="text" />
                </InputWrapper>
                <TagProvider>
                    <Tags />
                </TagProvider>
            </Form>
        </Layout>
    );
};
