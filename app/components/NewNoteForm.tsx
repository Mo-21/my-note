"use client";
import {
  editorNoteSchema,
  EditorNoteType,
} from "@/prisma/schema/editorNoteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Button,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useCreateAndUpdateNote from "../hooks/useCreateAndUpdateNote";
import { Note } from "@prisma/client";

interface NewNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note | null;
  isUpdating: boolean;
  isEditorNote: boolean;
}

const Editor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewNoteForm = ({
  isOpen,
  onClose,
  note,
  isUpdating,
  isEditorNote,
}: NewNoteFormProps) => {
  const { register, control, handleSubmit, reset } = useForm<EditorNoteType>({
    resolver: zodResolver(editorNoteSchema),
  });

  const { mutate } = useCreateAndUpdateNote(isUpdating);

  const onSubmit: SubmitHandler<EditorNoteType> = (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    mutate({
      id: note ? note.id : -1,
      title: data.title ? data.title : "",
      content: data.content,
      userId: -1,
      NoteType: isEditorNote ? "EDITOR" : "QUICK_NOTE",
      createdAt: note ? note.createdAt : new Date(),
      updatedAt: new Date(),
    });

    reset();
    onClose();
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              defaultValue={note?.title || undefined}
              type="text"
              label="Title"
              size="sm"
              {...register("title")}
            />
          </ModalHeader>
          <ModalBody
            className="w-full overflow-auto"
            style={{ maxHeight: "500px" }}
          >
            {isEditorNote ? (
              <Controller
                name="content"
                control={control}
                defaultValue={note?.content}
                render={({ field }) => (
                  <Editor placeholder="Note" options={options} {...field} />
                )}
              />
            ) : (
              <Textarea
                fullWidth
                label="Quick Note"
                defaultValue={note?.content}
                minRows={20}
                maxRows={100}
                style={{
                  fontSize: "18px",
                }}
                {...register("content")}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary">
              {note ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </form>
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

export default NewNoteForm;
