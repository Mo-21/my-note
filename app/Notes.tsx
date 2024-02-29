"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import ErrorCallout from "./components/ErrorCallout";
import NoteModal from "./components/NoteModal";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import { useInView } from "react-intersection-observer";
import { useNotesContext } from "./hooks/useNotesContext";
import deleteIcon from "@/app/assets/delete-icon.svg";
import editIcon from "@/app/assets/edit-icon.svg";
import Image from "next/image";

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
          <CardFooter className="flex justify-between items-center mt-auto">
            <div className="text-sm">
              {note.updatedAt.toString().split("T")[0]}
            </div>
            <div className="flex items-center gap-1">
              <Button isIconOnly size="sm">
                <Image className="w-4" src={editIcon} alt="editIcon" />
              </Button>
              <Button
                isIconOnly
                size="sm"
                onClick={async (e) => {
                  e.preventDefault;
                  e.stopPropagation;

                  await fetch("/api/note/delete", {
                    method: "DELETE",
                    body: JSON.stringify(note.id),
                  });
                }}
              >
                <Image className="w-4" src={deleteIcon} alt="deleteIcon" />
              </Button>
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
