import {
    Form,
    InputWrapper,
    ButtonContainer,
    StyledButton,
    CancelButton,
    Text,
    RightSideBar,
    Main,
    CancelText
} from "./styles";
import { Layout, TitleRow, Title } from "../styles";
import { Input } from "../../../../components/Input";
import { Tags } from "../../../../components/Tag";
import { useContext, useState } from "react";
import { TagProvider, ITag } from "../../../../components/Tag/Context";
import { ImageUpload } from "../../../../components/ImageUpload";
import { Image } from "../../../../components/ImageUpload";
import { AxiosContext } from "../../../../context/Axios";

export const CreateProduct = () => {
    const [title, setTitle] = useState("[undefined]");
    const [formTags, setFormTags] = useState<ITag[]>([]);
    const [formImages, setFormsImages] = useState<Image[]>([]);

    const { create } = useContext(AxiosContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formDetails = {
            ...Object.fromEntries(formData),
            tags: formTags,
            images: formImages
        };

        try {
            const createArgs = {
                data: { ...formDetails },
                slug: "products/"
            };
            await create(createArgs).then((res) => {
                console.log(res);
                // handle on success
            });
        } catch (error) {}
    };
    return (
        <Layout>
            <Form onSubmit={handleSubmit} method="POST">
                <Main>
                    <TitleRow>
                        <Title>{title}</Title>
                    </TitleRow>
                    <Input
                        title="Name"
                        path="name"
                        type="text"
                        handleChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <Input
                        title="Description"
                        path="description"
                        type="textarea"
                    />
                    <InputWrapper>
                        <Input
                            title="Price"
                            path="price"
                            type="text"
                            handleChange={() => {}}
                        />
                        <Input
                            title="Quantiy"
                            path="quantity"
                            type="text"
                            handleChange={() => {}}
                        />
                    </InputWrapper>
                    <TagProvider>
                        <Tags setFormTags={setFormTags} />
                    </TagProvider>
                    <ImageUpload setFormImages={setFormsImages} />
                </Main>

                <RightSideBar>
                    <div style={{ width: "100%", height: "100%" }}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <ButtonContainer>
                                <StyledButton>
                                    <Text>Create</Text>
                                </StyledButton>
                                <CancelButton>
                                    <CancelText>Cancel</CancelText>
                                </CancelButton>
                            </ButtonContainer>
                        </div>
                    </div>
                </RightSideBar>
            </Form>
        </Layout>
    );
};
