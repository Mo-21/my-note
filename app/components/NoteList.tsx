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
import { Dispatch, useReducer } from "react";
import useDeleteNote from "../hooks/useDeleteNote";
import {
  ModalReducerType,
  openModalReducer,
} from "../reducers/openModalReducer";
import NewNoteForm from "./NewNoteForm";
import NoteModal from "./NoteModal";
import { Toaster } from "react-hot-toast";
import CheckboxModal from "./CheckboxModal";
import Atropos from "atropos/react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import PinIcon from "../assets/PinIcon";
import useCreateAndUpdateNote from "../hooks/useCreateAndUpdateNote";

const NotesList = ({ notes }: { notes: Note[] }) => {
  const [state, dispatch] = useReducer(openModalReducer, {
    activeNote: null,
    editActive: false,
    previewActive: false,
    editCounter: 0,
  });

  const { theme } = useTheme();

  const cardStyle = classNames({
    "flex flex-col w-[300px] min-h-[250px] transition-colors duration-150 ease-in-out":
      true,
    "hover:bg-[#f5f5f5]": theme === "light",
    "hover:bg-[#2c3e50]": theme === "dark",
  });

  return (
    <div className="flex w-full mt-5 gap-3 flex-wrap px-5 justify-start">
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
            {note.title && <NoteTitle title={note.title} />}
            <CardBody className="flex-grow">
              <NoteBody note={note} />
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between items-center mt-auto h-10">
              <NoteFooter note={note} dispatch={dispatch} />
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
          key={`${state.activeNote.id}-${state.editCounter}`}
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

const NoteTitle = ({ title }: { title: string }) => {
  return (
    <>
      <CardHeader className="flex gap-3">{title}</CardHeader>
      <Divider />
    </>
  );
};

const NoteBody = ({ note }: { note: Note }) => {
  return (
    <>
      {note.NoteType === "CHECKBOX" ? (
        <CheckboxModal isPreviewing={false} note={note} />
      ) : (
        <p>{formatNote(note)}</p>
      )}
    </>
  );
};

const NoteFooter = ({
  note,
  dispatch,
}: {
  note: Note;
  dispatch: Dispatch<ModalReducerType>;
}) => {
  const { mutate } = useDeleteNote();
  const { mutate: pinNote } = useCreateAndUpdateNote(true);

  return (
    <>
      <div className="text-sm">
        {new Date(note.updatedAt).toISOString().split("T")[0]}
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={() => {
            dispatch({ type: "EDIT", payload: note });
          }}
          isIconOnly
          size="sm"
        >
          <EditIcon width={20} height={20} />
        </Button>
        <Button isIconOnly size="sm" onClick={() => mutate(note.id)}>
          <DeleteIcon width={20} height={20} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          onClick={() =>
            pinNote({
              id: note.id,
              title: note.title ? note.title : "",
              content: note.content,
              userId: -1,
              NoteType: note.NoteType,
              createdAt: note.createdAt,
              updatedAt: new Date(),
              isPinned: !note.isPinned,
            })
          }
        >
          <PinIcon width={20} height={20} />
        </Button>
      </div>
    </>
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
