import { useContext } from "react";
import { TagsContext } from "../providers/TagsProvider";

export const useTagsContext = () => useContext(TagsContext);
