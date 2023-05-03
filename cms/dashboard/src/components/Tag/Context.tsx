import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface TagContext {
    tags: ITag[];
    addTag: (title: string) => void;
    delTag: (id: string) => void;
}

export interface ITag {
    id: string;
    tag: string;
}

const TagsContext = createContext({} as TagContext);

export const TagProvider = ({ children }: { children: any }) => {
    const [tags, setTags] = useState<ITag[]>([]);

    const addTag = (title: string) => {
        const newTag: ITag = {
            id: uuidv4(),
            tag: title
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
