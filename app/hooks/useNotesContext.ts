import { useContext } from "react";
import { NotesCtx } from "../NotesProvider";

export const useNotesContext = () => useContext(NotesCtx);
