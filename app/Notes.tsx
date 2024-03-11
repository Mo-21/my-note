import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NotesList from "./components/NoteList";
import { Divider } from "@nextui-org/react";
import { Note } from "@prisma/client";

interface NotesProps {
  pinnedNotes?: Note[];
  unpinnedNotes?: Note[];
  archivedNotes?: Note[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const Notes = ({
  pinnedNotes = [],
  unpinnedNotes = [],
  archivedNotes = [],
  fetchNextPage,
  isFetchingNextPage,
}: NotesProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const hasNotes =
    pinnedNotes.length > 0 ||
    unpinnedNotes.length > 0 ||
    archivedNotes.length > 0;

  return (
    <div className="flex flex-col items-center">
      {hasNotes ? (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <NotesList notes={pinnedNotes} />
              <Divider className="my-3" />
            </>
          )}
          {unpinnedNotes.length > 0 && <NotesList notes={unpinnedNotes} />}
          {archivedNotes.length > 0 && <NotesList notes={archivedNotes} />}
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
