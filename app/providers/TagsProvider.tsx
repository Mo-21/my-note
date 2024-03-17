import { PropsWithChildren, createContext } from "react";
import { TaggedNotes, useGetTags } from "../hooks/useGetTags";

interface TagsContextType {
  tags:
    | {
        data: TaggedNotes[];
        nextCursor: string | null;
      }
    | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: any;
}

export const TagsContext = createContext<TagsContextType>(
  {} as TagsContextType
);

const TagsProvider = ({ children }: PropsWithChildren) => {
  const {
    data: tags,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useGetTags();

  return (
    <TagsContext.Provider
      value={{
        tags,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        error,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export default TagsProvider;
