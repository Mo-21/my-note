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
import useDeleteNote from "./hooks/useDeleteNote";
import { Toaster } from "react-hot-toast";
import NewNoteForm from "./components/NewNoteForm";

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
  const [editActive, setEditActive] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useDeleteNote();

  const handleOpenPreviewModal = (note: Note) => {
    setActiveNote(note);
    setPreviewActive(true);
  };

  const handleOpenEditModal = (note: Note) => {
    setActiveNote(note);
    setEditActive(true);
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
          <CardBody
            onClick={() => handleOpenPreviewModal(note)}
            className="flex-grow"
          >
            <p>{note.content}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between items-center mt-auto">
            <div className="text-sm">
              {note.updatedAt.toString().split("T")[0]}
            </div>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => handleOpenEditModal(note)}
                isIconOnly
                size="sm"
              >
                <Image className="w-4" src={editIcon} alt="editIcon" />
              </Button>
              <Button isIconOnly size="sm" onClick={() => mutate(note.id)}>
                <Image className="w-4" src={deleteIcon} alt="deleteIcon" />
              </Button>
            </div>
          </CardFooter>
          {activeNote && (
            <NoteModal
              isOpen={previewActive}
              onClose={() => {
                onClose();
                setActiveNote(null);
                setPreviewActive(false);
              }}
              note={activeNote}
            />
          )}
          {activeNote && (
            <NewNoteForm
              isOpen={editActive}
              onClose={() => {
                setActiveNote(null);
                setEditActive(false);
                onClose();
              }}
              note={activeNote}
              isUpdating={editActive}
            />
          )}
        </Card>
      ))}
      <Toaster />
    </div>
  );
};

export default Notes;
