"use client";
import "easymde/dist/easymde.min.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import "./globals.css";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const AddNewNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-center px-4 mt-3" onClick={() => onOpen()}>
        <div className="max-w-[740px] w-full h-max rounded-2xl flex justify-center items-center text-white shadow-sm backdrop-blur dark:bg-black/30">
          <Input
            isClearable
            readOnly={true}
            radius="lg"
            placeholder="New Note..."
          />
        </div>
        <CreateNewNote isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

const CreateNewNote = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      disableAnimation={true}
    >
      <ModalContent className="p-3 w-full">
        <ModalHeader className="flex flex-col gap-1">
          <Input type="text" label="Title" size="sm" />
        </ModalHeader>
        <ModalBody
          className="w-full overflow-auto"
          style={{ maxHeight: "500px" }}
        >
          <Editor placeholder="Note" options={options} autoSave="true" />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const options = {
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "unordered-list",
    "ordered-list",
    "|",
    "code",
    "quote",
    "link",
    "|",
    "undo",
    "redo",
    "|",
    "preview",
  ] as any,
  scrollbarStyle: "native",
};

export default AddNewNote;
