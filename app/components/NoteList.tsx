import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Spinner,
} from "@nextui-org/react";
import { Note } from "@prisma/client";
import NewNoteForm from "./NewNoteForm";
import NoteModal from "./NoteModal";
import CheckboxModal from "./CheckboxModal";
import Atropos from "atropos/react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import NoteActionsDropdown from "./NoteActionsDropdown";
import { useActiveNote } from "../hooks/useActiveNote";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface NotesListProps {
  notes: Note[];
  noteKey: string;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const NotesList = ({
  fetchNextPage,
  isFetchingNextPage,
  notes,
  noteKey,
}: NotesListProps) => {
  const { state, dispatch } = useActiveNote();
  const { theme } = useTheme();

  const cardStyle = classNames({
    "flex flex-col w-[170px] h-[200px] transition-colors duration-150 ease-in-out sm:w-[300px] sm:h-[250px]":
      true,
    "hover:bg-[#f5f5f5]": theme === "light",
    "hover:bg-[#2c3e50]": theme === "dark",
  });

  if (!notes || notes.length === 0) return <></>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full gap-2 flex-wrap px-5 justify-between sm:justify-start">
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
              <CardBody className="flex-grow overflow-hidden h-full">
                <NoteBody note={note} />
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between items-center mt-auto h-8">
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
      </div>
      {noteKey !== "PINNED" && (
        <InView
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

const InView = ({
  fetchNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>;
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
        <p>{note.content}</p>
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

export default NotesList;
