"use client";
import { NewNoteType, newNoteSchema } from "@/prisma/schema/noteSchema";
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
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useGetNotes } from "../hooks/useGetNotes";

interface NewNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Editor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewNoteForm = ({ isOpen, onClose }: NewNoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewNoteType>({
    resolver: zodResolver(newNoteSchema),
  });

  const { refetch } = useGetNotes();

  const onSubmit: SubmitHandler<NewNoteType> = async (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    setIsSubmitting(true);
    try {
      await fetch("/api/note/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          toast.success("New note created");
          setIsSubmitting(false);
          reset();
          refetch();
          onClose();
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <Input type="text" label="Title" size="sm" {...register("title")} />
          </ModalHeader>
          <ModalBody
            className="w-full overflow-auto"
            style={{ maxHeight: "500px" }}
          >
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Editor placeholder="Note" options={options} {...field} />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
              color="primary"
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
      <Toaster />
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
