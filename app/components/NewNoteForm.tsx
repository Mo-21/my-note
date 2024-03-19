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
  Button,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import useCreateAndUpdateNote from "../hooks/useCreateAndUpdateNote";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import NoteEditorForm from "./NoteEditorForm";
import NoteTextarea from "./NoteTextarea";
import CheckboxForm, { Todo } from "./CheckboxForm";

interface NewNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note | null;
  isUpdating: boolean;
  noteType: "EDITOR" | "QUICK_NOTE" | "CHECKBOX";
}

const NewNoteForm = ({
  isOpen,
  onClose,
  note,
  isUpdating,
  noteType,
}: NewNoteFormProps) => {
  const { register, control, handleSubmit, reset, setValue, getValues } =
    useForm<EditorNoteType>({
      resolver: zodResolver(editorNoteSchema),
    });

  const { mutate } = useCreateAndUpdateNote(isUpdating);

  const onSubmit: SubmitHandler<EditorNoteType> = (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    mutate({
      id: note ? note.id : "-1",
      title: data.title ? data.title : "",
      content: noteType === "CHECKBOX" ? getValues("content") : data.content,
      userId: "-1",
      NoteType: noteType,
      createdAt: note ? note.createdAt : new Date(),
      updatedAt: new Date(),
      isPinned: note ? note.isPinned : false,
      isArchived: note ? note.isArchived : false,
      tagsIDs: note?.tagsIDs ? note.tagsIDs : [],
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
            {noteType === "EDITOR" ? (
              <NoteEditorForm control={control} note={note} />
            ) : noteType === "QUICK_NOTE" ? (
              <NoteTextarea register={register} note={note} />
            ) : (
              <CheckboxForm
                note={note}
                isUpdating={isUpdating}
                setValue={setValue}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
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

export default NewNoteForm;
