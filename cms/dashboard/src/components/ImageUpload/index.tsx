import { useState } from "react";
import {
    Img,
    ImgWrapper,
    DelImage,
    ImageUploadWrapper,
    UploadInput
} from "./styles";
import { v4 as uuidv4 } from "uuid";

interface Image {
    url: string;
    tag: string;
}

export const ImageUpload = () => {
    const [images, setImages] = useState<Image[]>([]);

    const handleChange = (e) => {
        const { files } = e.target;
        console.log(files);

        const newImages = Array.from(files).map((file: any) => {
            return {
                url: URL.createObjectURL(file),
                tag: ""
            };
        });

        setImages([...images, ...newImages]);
    };
    return (
        <ImageUploadWrapper>
            {images.map((image) => {
                return (
                    <ImgWrapper key={uuidv4().toString()}>
                        <div style={{ position: "relative" }}>
                            <DelImage />
                            <Img src={image.url} />
                        </div>
                    </ImgWrapper>
                );
            })}
            <UploadInput type="file" onChange={handleChange} />
        </ImageUploadWrapper>
    );
};
