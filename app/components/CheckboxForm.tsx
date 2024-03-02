"use client";
import { EditorNoteType } from "@/prisma/schema/editorNoteSchema";
import { Button, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { RemoveLogo } from "../assets/RemoveLogo";

export interface Todo {
  selected: boolean;
  content: string;
}

//TODO: use reducer
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

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setSelectedValues(todos.filter((t) => t.selected).map((t) => t.content));
  }, [todos]);

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
      <CheckboxGroup
        value={selectedValues}
        lineThrough
        color="success"
        defaultValue={[]}
      >
        {todos.map((t, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox
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

export default CheckboxForm;
