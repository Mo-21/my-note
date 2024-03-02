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
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import {
  useForm,
  Controller,
  SubmitHandler,
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import useCreateAndUpdateNote from "../hooks/useCreateAndUpdateNote";
import { Note } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { RemoveLogo } from "../assets/RemoveLogo";
import CheckboxModal from "./CheckboxModal";

interface NewNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note | null;
  isUpdating: boolean;
  noteType: "EDITOR" | "QUICK_NOTE" | "CHECKBOX";
}

interface Todo {
  selected: boolean;
  content: string;
}

const Editor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

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
  const [todos, setTodos] = useState<Todo[]>(
    noteType === "CHECKBOX" && isUpdating && note
      ? JSON.parse(note.content)
      : []
  );

  const onSubmit: SubmitHandler<EditorNoteType> = (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    mutate({
      id: note ? note.id : -1,
      title: data.title ? data.title : "",
      content: noteType === "CHECKBOX" ? getValues("content") : data.content,
      userId: -1,
      NoteType: noteType,
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
            {noteType === "EDITOR" ? (
              <NoteEditor control={control} note={note} />
            ) : noteType === "CHECKBOX" && isUpdating && note ? (
              <CheckboxForm
                setValue={setValue}
                todos={todos}
                setTodos={setTodos}
              />
            ) : noteType === "QUICK_NOTE" ? (
              <NoteTextArea register={register} note={note} />
            ) : (
              <CheckboxForm
                setValue={setValue}
                todos={todos}
                setTodos={setTodos}
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

const NoteEditor = ({
  control,
  note,
}: {
  control: Control<EditorNoteType>;
  note: Note | null | undefined;
}) => {
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
    <Controller
      name="content"
      control={control}
      defaultValue={note?.content}
      render={({ field }) => (
        <Editor placeholder="Note" options={options} {...field} />
      )}
    />
  );
};

const NoteTextArea = ({
  register,
  note,
}: {
  register: UseFormRegister<EditorNoteType>;
  note: Note | null | undefined;
}) => {
  return (
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
  );
};

const CheckboxForm = ({
  todos,
  setTodos,
  setValue,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setValue: UseFormSetValue<EditorNoteType>;
}) => {
  const [currentTodo, setCurrentTodo] = useState<string>("");

  const handleAddTodo = () => {
    const newTodo = { selected: false, content: currentTodo };
    setTodos((currentTodos) => {
      const updatedTodos = [...currentTodos, newTodo];
      setValue("content", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCurrentTodo("");
  };

  const handleTodoChange = (index: number, isSelected: boolean) => {
    setTodos((currentTodos) => {
      const updatedTodos = currentTodos.map((todo, i) =>
        i === index ? { ...todo, selected: isSelected } : todo
      );
      setValue("content", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleRemoveTodo = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    setTodos((currentTodos) => {
      const updatedTodos = currentTodos.filter((_, i) => i !== index);
      setValue("content", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 max-w-[50%]">
        <Input
          type="text"
          size="sm"
          variant="bordered"
          placeholder="Add Todo"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
        <Button
          onClick={handleAddTodo}
          color="success"
          className="h-11"
          radius="sm"
        >
          Add
        </Button>
      </div>
      <CheckboxGroup lineThrough color="success" defaultValue={[]}>
        {todos.map((t, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox
              isSelected={t.selected}
              onValueChange={(isSelected) =>
                handleTodoChange(index, isSelected)
              }
              value={t.content}
            >
              {t.content}
            </Checkbox>
            <button
              type="button"
              onClick={(event) => handleRemoveTodo(event, index)}
              className="bg-red-500 rounded-md"
            >
              <RemoveLogo width={22} height={22} />
            </button>
          </div>
        ))}
      </CheckboxGroup>
    </>
  );
};

export default NewNoteForm;
