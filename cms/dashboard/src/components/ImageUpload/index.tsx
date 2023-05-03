import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
    Img,
    ImgWrapper,
    DelImage,
    ImageUploadWrapper,
    UploadInput,
    Title,
    TagImage
} from "./styles";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

export interface Image {
    url: any;
    tag: string;
    id: string;
}

export const ImageUpload = ({
    setFormImages
}: {
    setFormImages: Dispatch<SetStateAction<Image[]>>;
}) => {
    const [images, setImages] = useState<Image[]>([]);
    const [editImageId, setEditImageId] = useState("");
    const [inputValue, setInputValue] = useState<string | undefined>("");

    useEffect(() => {
        if (!images.length) setInputValue("");
        setFormImages(images);
    }, [images]);

    const handleImageUpload = (e: any) => {
        const { files } = e.target;
        try {
            const reader = new FileReader();
            Array.from(files).map((file: any) => {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImages([
                        ...images,
                        {
                            url: reader.result,
                            tag: "",
                            id: uuidv4().toString()
                        }
                    ]);
                };
            });
        } catch (error) {}
    };

    const onImageClick = (id: string) => {
        setEditImageId(id);
        setInputValue(() => {
            const imageTag = images.find((image) => image.id === id)?.tag;
            return imageTag !== undefined ? imageTag : "";
        });
    };

    const handleInput = (e: any) => {
        e.preventDefault();
        setInputValue(e.target.value);
        const newImages = images.map((image) => {
            if (image.id === editImageId) {
                return { ...image, tag: e.target.value };
            }
            return image;
        });

        setImages(newImages);

        if (images.length === 1) {
            setEditImageId(images[0].id);
        }
    };

    const delImage = (id: string) => {
        setImages([
            ...images.filter((image) => {
                return image.id !== id;
            })
        ]);
        setInputValue(() => {
            if (images.length) {
                return images[0].tag;
            }
            return "";
        });
    };

    const showInput = images.length > 0;

    return (
        <div className="image-upload-container">
            <Title>Upload images</Title>
            {showInput && (
                <input
                    value={inputValue}
                    type="text"
                    name="image"
                    onChange={handleInput}
                />
            )}

            <ImageUploadWrapper>
                {images.map((image) => {
                    const emptyTag = image.tag === "";
                    return (
                        <ImgWrapper
                            key={image.id}
                            onClick={(e) => {
                                e.preventDefault();
                                onImageClick(image.id);
                            }}
                        >
                            <div
                                className={`relative ${
                                    editImageId === image.id ? "selected" : ""
                                }`}
                            >
                                <DelImage
                                    onClick={(e) => {
                                        e.preventDefault();
                                        delImage(image.id);
                                    }}
                                />
                                {!emptyTag && <TagImage>Tag</TagImage>}
                                <Img src={image.url} title={image.tag} />
                            </div>
                        </ImgWrapper>
                    );
                })}
                <UploadInput type="file" onChange={handleImageUpload} />
            </ImageUploadWrapper>
        </div>
    );
};
