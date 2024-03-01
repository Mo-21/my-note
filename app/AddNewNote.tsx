"use client";
import "easymde/dist/easymde.min.css";
import { useDisclosure, Button, ButtonGroup } from "@nextui-org/react";
import "./globals.css";
import NewNoteForm from "./components/NewNoteForm";

const AddNewNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-evenly items-center px-4 mt-3">
        <CreateNoteButtons onOpen={onOpen} />
        <NewNoteForm isOpen={isOpen} onClose={onClose} isUpdating={false} />
      </div>
    </div>
  );
};

const CreateNoteButtons = ({ onOpen }: { onOpen: () => void }) => {
  const buttons: { key: string; value: string; fn?: () => void }[] = [
    {
      key: "quick_note",
      value: "Quick Note",
    },
    {
      key: "quick_note",
      value: "Editor",
      fn: () => onOpen(),
    },
    {
      key: "quick_note",
      value: "Checkbox",
    },
  ];
  return (
    <ButtonGroup variant="ghost" className="flex">
      {buttons.map((b) => (
        <Button onClick={b.fn} key={b.key}>
          {b.value}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default AddNewNote;
