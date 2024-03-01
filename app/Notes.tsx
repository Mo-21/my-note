"use client";
import ErrorCallout from "./components/ErrorCallout";
import { useEffect } from "react";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import { useInView } from "react-intersection-observer";
import { useNotesContext } from "./hooks/useNotesContext";
import NotesList from "./components/NoteList";

const Notes = () => {
  const {
    filteredNotes: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotesContext();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <div className="flex flex-col items-center">
      {notes && notes.length > 0 ? (
        <>
          <NotesList notes={notes} />
          <div className="mt-3" ref={ref}>
            {isFetchingNextPage && "Loading..."}
          </div>
        </>
      ) : (
        <div className="mt-3">There are no notes</div>
      )}
    </div>
  );
};

export default Notes;
