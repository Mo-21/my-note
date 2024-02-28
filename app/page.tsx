"use client";
import NavigationBar from "./NavigationBar";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";
import { useGetInfiniteNotes } from "./hooks/useGetNotes";
import { useEffect } from "react";
import { useNotesContext } from "./hooks/useNotesContext";

export default function Home() {
  const {
    data: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteNotes();

  const { setNotes, filteredNotes } = useNotesContext();

  useEffect(() => {
    if (notes && notes.data) setNotes(notes.data);
  }, [notes, setNotes]);

  return (
    <div>
      <NavigationBar />
      <AddNewNote />
      <Notes
        notes={filteredNotes}
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
