"use client";
import { Note } from "@prisma/client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { useGetInfiniteNotes } from "../hooks/useGetNotes";

interface NotesContextType {
  filteredNotes: {
    pinnedNotes: Note[];
    unpinnedNotes: Note[];
    archivedNotes: Note[];
  };
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}

export const NotesCtx = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState<string>("");

  const {
    data: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteNotes();

  const filteredNotes = useMemo(() => {
    if (!notes?.data)
      return { pinnedNotes: [], unpinnedNotes: [], archivedNotes: [] };

    const filtered = query
      ? notes.data.filter((note) => {
          return (
            note.title?.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
          );
        })
      : notes.data;

    const archivedNotes = filtered.filter((n) => n.isArchived);
    const pinnedNotes = filtered.filter((n) =>
      query ? n.isPinned : n.isPinned && !n.isArchived
    );
    const unpinnedNotes = filtered.filter((n) =>
      query ? !n.isPinned : !n.isPinned && !n.isArchived
    );

    return { pinnedNotes, unpinnedNotes, archivedNotes };
  }, [notes, query]);

  return (
    <NotesCtx.Provider
      value={{
        filteredNotes,
        query,
        setQuery,
        isLoading,
        error,
        fetchNextPage,
        isFetchingNextPage,
      }}
    >
      {children}
    </NotesCtx.Provider>
  );
};
