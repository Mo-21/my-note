"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import ErrorCallout from "./components/ErrorCallout";
import NoteModal from "./components/NoteModal";
import { useEffect, useReducer } from "react";
import { Note } from "@prisma/client";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import { useInView } from "react-intersection-observer";
import { useNotesContext } from "./hooks/useNotesContext";
import deleteIcon from "@/app/assets/delete-icon.svg";
import editIcon from "@/app/assets/edit-icon.svg";
import Image from "next/image";
import useDeleteNote from "./hooks/useDeleteNote";
import NewNoteForm from "./components/NewNoteForm";
import { openModalReducer } from "./reducers/openModalReducer";

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
  const { mutate } = useDeleteNote();
  const [state, dispatch] = useReducer(openModalReducer, {
    activeNote: null,
    editActive: false,
    previewActive: false,
  });

  console.log(state.activeNote);
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
            onClick={() => dispatch({ type: "PREVIEW", payload: note })}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch({ type: "EDIT", payload: note });
                }}
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
          {state.activeNote && (
            <NoteModal
              isOpen={state.previewActive}
              onClose={() => dispatch({ type: "CLOSE" })}
              note={state.activeNote}
            />
          )}
          {state.activeNote && (
            <NewNoteForm
              key={state.activeNote.id}
              isOpen={state.editActive}
              onClose={() => dispatch({ type: "CLOSE" })}
              isUpdating={state.editActive}
              note={state.activeNote}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default Notes;
