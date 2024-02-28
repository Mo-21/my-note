import { useContext } from "react";
import { NotesCtx } from "../providers/NotesProvider";

export const useNotesContext = () => useContext(NotesCtx);
