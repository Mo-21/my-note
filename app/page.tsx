"use client";
import NavigationBar from "./NavigationBar";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";
import { useGetInfiniteNotes } from "./hooks/useGetNotes";
import { useEffect } from "react";
import { useNotesContext } from "./hooks/useNotesContext";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <AddNewNote />
      <Notes />
    </div>
  );
}
