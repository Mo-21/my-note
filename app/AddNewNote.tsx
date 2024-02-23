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
import SimpleMDE from "react-simplemde-editor";

const AddNewNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <div>
      <div className="flex justify-center px-4 mt-3" onClick={() => onOpen()}>
        <div className="max-w-[740px] w-full h-max rounded-2xl flex justify-center items-center text-white shadow-sm backdrop-blur dark:bg-black/30">
          <Input
            isClearable
            readOnly={true}
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="New Note..."
          />
        </div>
      </div>

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
            <SimpleMDE placeholder="Note" options={options} autoSave="true" />
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
    </div>
  );
};

export default AddNewNote;
