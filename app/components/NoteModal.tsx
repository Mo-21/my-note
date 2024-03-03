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
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import CheckboxModal from "@/app/components/CheckboxModal";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const NoteModal = ({ isOpen, onClose, note }: NoteModalProps) => {
  return (
    <Modal
      backdrop="transparent"
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
          className="min-w-full overflow-auto prose"
          style={{ maxHeight: "500px" }}
        >
          {note.NoteType === "CHECKBOX" ? (
            <CheckboxModal isDisabled={true} note={note} />
          ) : (
            <MarkdownViewer>{note.content}</MarkdownViewer>
          )}
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

const MarkdownViewer = ({ children }: { children: string }) => {
  const { theme } = useTheme();

  //customizing text color to match themes
  const customComponents = {
    // Customizing heading elements (e.g., h1, h2, h3)
    h1: ({ ...props }) => (
      <h1 style={{ color: theme === "dark" ? "white" : "black" }} {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 style={{ color: theme === "dark" ? "white" : "black" }} {...props} />
    ),
    h3: ({ ...props }) => (
      <h3 style={{ color: theme === "dark" ? "white" : "black" }} {...props} />
    ),
    h4: ({ ...props }) => (
      <h4 style={{ color: theme === "dark" ? "white" : "black" }} {...props} />
    ),
    h5: ({ ...props }) => (
      <h5 style={{ color: theme === "dark" ? "white" : "black" }} {...props} />
    ),

    // Customizing blockquotes
    blockquote: ({ ...props }) => (
      <blockquote
        style={{ color: theme === "dark" ? "lightgray" : "darkgray" }}
        {...props}
      />
    ),

    // Customize Link element
    a: ({ ...props }) => (
      <a
        style={{
          color: theme === "dark" ? "cyan" : "blue",
          textDecoration: "underline",
        }}
        {...props}
      />
    ),

    //customizing strong text
    strong: ({ ...props }) => (
      <strong
        style={{ color: theme === "dark" ? "white" : "black" }}
        {...props}
      />
    ),
  };
  return (
    <ReactMarkdown
      components={customComponents}
      className={theme === "dark" ? "text-white" : "text-black"}
    >
      {children}
    </ReactMarkdown>
  );
};

export default NoteModal;
