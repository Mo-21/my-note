"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useGetInfiniteNotes } from "./hooks/useGetNotes";
import ErrorCallout from "./components/ErrorCallout";
import NoteModal from "./components/NoteModal";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import NotesSkeleton from "./components/NotesSkeleton";
import { useInView } from "react-intersection-observer";

const Notes = () => {
  const {
    data: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteNotes();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <div className="flex flex-col items-center">
      {notes?.data && notes?.data.length > 0 ? (
        <>
          <NotesList notes={notes.data} />
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

const NotesList = ({ notes }: { notes: Note[] }) => {
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (note: Note) => {
    setActiveNote(note);
    onOpen();
  };

  return (
    <div className="flex mt-5 gap-3 flex-wrap px-5 justify-center">
      {notes.map((note, index) => (
        <Card className="flex flex-col w-[300px] min-h-[250px]" key={index}>
          {note.title && (
            <>
              <CardHeader className="flex gap-3">{note.title}</CardHeader>
              <Divider />
            </>
          )}
          <CardBody onClick={() => handleOpenModal(note)} className="flex-grow">
            <p>{note.content}</p>
          </CardBody>
          <Divider />
          <CardFooter className="mt-auto">
            <div className="text-sm">
              {note.updatedAt.toString().split("T")[0]}
            </div>
          </CardFooter>
          {activeNote && (
            <NoteModal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                setActiveNote(null);
              }}
              note={activeNote}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default Notes;
