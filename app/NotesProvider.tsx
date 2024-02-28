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
import { useGetInfiniteNotes } from "./hooks/useGetNotes";

interface NotesContextType {
  filteredNotes: Note[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
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
    if (!notes?.data) return [];
    if (!query) return notes.data;
    return notes?.data.filter((note) => {
      return (
        note.title?.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [notes, query]);

  return (
    <NotesCtx.Provider
      value={{
        filteredNotes,
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
