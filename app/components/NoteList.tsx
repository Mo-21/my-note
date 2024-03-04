"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Note } from "@prisma/client";
import { useReducer, useState } from "react";
import useDeleteNote from "../hooks/useDeleteNote";
import { openModalReducer } from "../reducers/openModalReducer";
import NewNoteForm from "./NewNoteForm";
import NoteModal from "./NoteModal";
import editIcon from "@/app/assets/edit-icon.svg";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import CheckboxModal from "./CheckboxModal";
import Atropos from "atropos/react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import DeleteIcon from "../assets/DeleteIcon";

const NotesList = ({ notes }: { notes: Note[] }) => {
  const { mutate } = useDeleteNote();
  const [state, dispatch] = useReducer(openModalReducer, {
    activeNote: null,
    editActive: false,
    previewActive: false,
  });

  const [editCounter, setEditCounter] = useState(0);
  const { theme } = useTheme();

  const cardStyle = classNames({
    "flex flex-col w-[300px] min-h-[250px] transition-colors duration-150 ease-in-out":
      true,
    "hover:bg-[#f5f5f5]": theme === "light",
    "hover:bg-[#2c3e50]": theme === "dark",
  });

  return (
    <div className="flex mt-5 gap-3 flex-wrap px-5 justify-center">
      {notes.map((note, index) => (
        <Atropos
          activeOffset={10}
          shadow={false}
          highlight={false}
          className="my-atropos-custom"
          key={index}
          onClick={() => dispatch({ type: "PREVIEW", payload: note })}
        >
          <Card className={cardStyle}>
            {note.title && (
              <>
                <CardHeader className="flex gap-3">{note.title}</CardHeader>
                <Divider />
              </>
            )}
            <CardBody className="flex-grow">
              <p>
                {note.NoteType === "CHECKBOX" ? (
                  <CheckboxModal isPreviewing={false} note={note} />
                ) : (
                  formatNote(note)
                )}
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center mt-auto h-10">
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
                  <DeleteIcon width={20} height={20} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Atropos>
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
    ? note.content.slice(0, 101) + "..."
    : !note.title && note.content.length > 100
    ? note.content.slice(0, 221) + "..."
    : note.content;
};

export default NotesList;
