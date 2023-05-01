import React, { useState } from "react";
import {
    TagTitle,
    StyledTag,
    TagText,
    UL,
    AddTag,
    TagWrapper,
    TagInput
} from "./styles";
import { useTagsContext } from "./Context";

const TagItem = ({ tag }) => {
    const { delTag } = useTagsContext();
    return (
        <StyledTag>
            <TagText>{tag.title}</TagText>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    delTag(tag.id);
                }}
            >
                X
            </button>
        </StyledTag>
    );
};

export const Tags = () => {
    const { tags, addTag } = useTagsContext();
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            console.log("adding tag");
            addTag(title);
            setTitle("");
            setMessage("");
        } else {
            setMessage("Enter a tag");
        }
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <>
            <TagTitle>Tags</TagTitle>
            <div>
                <input
                    placeholder="Enter a tag"
                    value={title}
                    onChange={handleChange}
                />
                <button
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
                    Add
                </button>
            </div>
            <TagWrapper>
                <UL>
                    {tags.map((tag) => (
                        <TagItem key={tag.id} tag={tag} />
                    ))}
                </UL>
            </TagWrapper>
        </>
    );
};
