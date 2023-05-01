import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface TagContext {
    tags: ITag[];
    addTag: (title: string) => void;
    delTag: (id: string) => void;
}

interface ITag {
    id: string;
    title: string;
}

const TagsContext = createContext({} as TagContext);

export const TagProvider = ({ children }) => {
    const [tags, setTags] = useState<any>([]);

    const handleChange = (id: string) => {
        setTags((prevState) => {
            prevState.map((tag) => {
                if (tag.id === id) {
                    return {
                        ...tag
                    };
                }
                return tag;
            });
        });
    };

    const addTag = (title: string) => {
        const newTag: ITag = {
            id: uuidv4(),
            title: title
        };
        setTags([...tags, newTag]);
    };

    const delTag = (id: string) => {
        setTags([
            ...tags.filter((tag: ITag) => {
                console.log(tag.id);
                return tag.id !== id;
            })
        ]);
    };

    return (
        <TagsContext.Provider value={{ tags, addTag, delTag }}>
            {children}
        </TagsContext.Provider>
    );
};

export const useTagsContext = () => useContext(TagsContext);
