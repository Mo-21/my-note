import { PropsWithChildren, createContext } from "react";
import { TaggedNotes, useGetTags } from "../hooks/useGetTags";
import { usePathname } from "next/navigation";

interface TagsContextType {
  tags:
    | {
        data: TaggedNotes[];
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
  const pathname = usePathname();
  const shouldFetch = pathname === "/"; // Only fetch on the homepage

  const {
    data: tags,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useGetTags(shouldFetch);

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
