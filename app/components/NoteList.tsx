import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Note } from "@prisma/client";
import NewNoteForm from "./NewNoteForm";
import NoteModal from "./NoteModal";
import { Toaster } from "react-hot-toast";
import CheckboxModal from "./CheckboxModal";
import Atropos from "atropos/react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import NoteActionsDropdown from "./NoteActionsDropdown";
import { useActiveNote } from "../hooks/useActiveNote";

const NotesList = ({ notes }: { notes: Note[] }) => {
  const { state, dispatch } = useActiveNote();
  const { theme } = useTheme();

  const cardStyle = classNames({
    "flex flex-col w-[300px] min-h-[250px] transition-colors duration-150 ease-in-out":
      true,
    "hover:bg-[#f5f5f5]": theme === "light",
    "hover:bg-[#2c3e50]": theme === "dark",
  });

  return (
    <div className="flex w-full gap-2 flex-wrap px-5 justify-start">
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
              <NoteFooter note={note} />
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

const NoteFooter = ({ note }: { note: Note }) => {
  return (
    <>
      <div className="text-sm">
        {new Date(note.updatedAt).toISOString().split("T")[0]}
      </div>
      <div className="flex items-center gap-1">
        <NoteActionsDropdown note={note} />
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
