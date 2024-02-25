"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Skeleton,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useGetNotes } from "./hooks/useGetNotes";
import ErrorCallout from "./components/ErrorCallout";
import NoteModal from "./components/NoteModal";
import { useState } from "react";
import { Note } from "@prisma/client";
import NotesSkeleton from "./components/NotesSkeleton";

const Notes = () => {
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const { data: notes, isLoading, error } = useGetNotes();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (note: Note) => {
    setActiveNote(note);
    onOpen();
  };

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <div className="flex mt-5 gap-3 flex-wrap px-5 justify-center">
      {notes ? (
        notes.map((note, index) => (
          <Card className="flex flex-col w-[300px] min-h-[250px]" key={index}>
            {note.title ? (
              <>
                <CardHeader className="flex gap-3">{note.title}</CardHeader>
                <Divider />
              </>
            ) : (
              ""
            )}
            <CardBody
              onClick={() => handleOpenModal(note)}
              className="flex-grow"
            >
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
            )}{" "}
          </Card>
        ))
      ) : (
        <div>There are no notes</div>
      )}
    </div>
  );
};

export default Notes;
