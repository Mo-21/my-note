"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Note, NoteType } from "@prisma/client";
import { useReducer, useState, useMemo } from "react";
import useDeleteNote from "../hooks/useDeleteNote";
import { openModalReducer } from "../reducers/openModalReducer";
import NewNoteForm from "./NewNoteForm";
import NoteModal from "./NoteModal";
import deleteIcon from "@/app/assets/delete-icon.svg";
import editIcon from "@/app/assets/edit-icon.svg";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import CheckboxModal from "./CheckboxModal";

const NotesList = ({ notes }: { notes: Note[] }) => {
  const { mutate } = useDeleteNote();
  const [state, dispatch] = useReducer(openModalReducer, {
    activeNote: null,
    editActive: false,
    previewActive: false,
  });

  const [editCounter, setEditCounter] = useState(0);

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
            <p>
              {note.NoteType === "CHECKBOX" ? (
                <CheckboxModal isPreviewing={false} note={note} />
              ) : (
                formatNote(note)
              )}
            </p>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between items-center mt-auto">
            <div className="text-sm">
              {new Date(note.updatedAt).toISOString().split("T")[0]}
            </div>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => {
                  dispatch({ type: "EDIT", payload: note });
                  setEditCounter(editCounter + 1);
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
        </Card>
      ))}
      {state.activeNote && state.previewActive && (
        <NoteModal
          key={state.activeNote.id}
          isOpen={state.previewActive}
          onClose={() => dispatch({ type: "CLOSE" })}
          note={state.activeNote}
        />
      )}
      {state.activeNote && state.editActive && (
        <NewNoteForm
          key={`${state.activeNote.id}-${editCounter}`}
          noteType={state.activeNote.NoteType}
          isOpen={state.editActive}
          onClose={() => dispatch({ type: "CLOSE" })}
          isUpdating={true}
          note={state.activeNote}
        />
      )}
      <Toaster />
    </div>
  );
};

const formatNote = (note: Note) => {
  return note.title && note.content.length > 100
    ? note.content.slice(0, 121) + "..."
    : !note.title && note.content.length > 100
    ? note.content.slice(0, 221) + "..."
    : note.content;
};

export default NotesList;
