import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "../Input";
import { StyledTag, TagText, UL, DelTagButton } from "./styles";
import { useTagsContext } from "./Context";
import { ITag } from "./Context";

const TagItem = ({ tag }: { tag: ITag }) => {
    const { delTag } = useTagsContext();
    return (
        <StyledTag>
            <TagText>{tag.tag}</TagText>
            <DelTagButton
                onClick={(e) => {
                    e.preventDefault();
                    delTag(tag.id);
                }}
            >
                <span>x</span>
            </DelTagButton>
        </StyledTag>
    );
};

export const Tags = ({
    setFormTags
}: {
    setFormTags: Dispatch<SetStateAction<ITag[]>>;
}) => {
    const { tags, addTag } = useTagsContext();
    const [title, setTitle] = useState("");

    useEffect(() => {
        setFormTags(tags);
    }, [tags]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (title.trim()) {
            addTag(title);
            setTitle("");
        }
    };

    const handleChange = (e: any) => {
        setTitle(e.target.value);
    };

    return (
        <>
            <Input
                path="tags"
                title="Tags"
                type="text"
                handleChange={handleChange}
            />
            <button
                style={{ visibility: "hidden", position: "fixed" }}
                onClick={(e) => {
                    handleSubmit(e);
                }}
            ></button>
            <UL>
                {tags.map((tag) => (
                    <TagItem key={tag.id} tag={tag} />
                ))}
            </UL>
        </>
    );
};
