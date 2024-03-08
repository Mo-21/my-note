import { useContext } from "react";
import { ActiveNoteContext } from "../providers/ActiveNoteProvider";

export const useActiveNote = () => useContext(ActiveNoteContext);
