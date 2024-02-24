"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Note } from "@prisma/client";
import ReactMarkdown from "react-markdown";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}
//TODO: shiny modal on light mode
const NoteModal = ({ isOpen, onClose, note }: NoteModalProps) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      disableAnimation={true}
      placement="center"
    >
      <ModalContent className="p-3 w-full">
        <ModalHeader className="flex flex-col gap-1">{note.title}</ModalHeader>
        <ModalBody
          className="w-full overflow-auto prose"
          style={{ maxHeight: "500px" }}
        >
          {/* //TODO: Fix headers color on black mode */}
          <ReactMarkdown className="text-white">{note.content}</ReactMarkdown>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
