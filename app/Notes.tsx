"use client";
import ErrorCallout from "./components/ErrorCallout";
import { useEffect } from "react";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import { useInView } from "react-intersection-observer";
import { useNotesContext } from "./hooks/useNotesContext";
import NotesList from "./components/NoteList";
import { Divider } from "@nextui-org/react";

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

  const pinnedNotes = notes.filter((n) => n.isPinned);
  const unpinnedNotes = notes.filter((n) => !n.isPinned);

  return (
    <div className="flex flex-col items-center">
      {notes.length > 0 ? (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <NotesList notes={pinnedNotes} />
              <Divider className="my-3" />
            </>
          )}
          <NotesList notes={unpinnedNotes} />
        </>
      ) : (
        <div className="mt-3">There are no notes</div>
      )}
      <div className="mt-3" ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </div>
  );
};

export default Notes;
