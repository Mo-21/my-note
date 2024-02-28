import { Note } from "@prisma/client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface NotesContextType {
  filteredNotes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
}

const NotesCtx = createContext<NotesContextType>({} as NotesContextType);

export const useNotesContext = () => useContext(NotesCtx);

export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>("");

  const filteredNotes = useMemo(() => {
    if (!query) return notes;
    return notes.filter((note) => {
      return (
        note.title?.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [notes, query]);

  return (
    <NotesCtx.Provider value={{ filteredNotes, setNotes, setQuery }}>
      {children}
    </NotesCtx.Provider>
  );
};
