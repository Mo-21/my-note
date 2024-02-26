"use client";
import "easymde/dist/easymde.min.css";
import { useDisclosure, Input } from "@nextui-org/react";
import "./globals.css";
import NewNoteForm from "./components/NewNoteForm";

const AddNewNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-center px-4 mt-3">
        <div
          onClick={() => onOpen()}
          className="max-w-[740px] w-full h-max rounded-2xl flex justify-center items-center text-white shadow-sm backdrop-blur dark:bg-black/30"
        >
          <Input
            isClearable
            readOnly={true}
            radius="lg"
            placeholder="New Note..."
          />
        </div>
        <NewNoteForm isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddNewNote;
