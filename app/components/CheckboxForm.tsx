"use client";
import { EditorNoteType } from "@/prisma/schema/editorNoteSchema";
import { Button, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useReducer, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { RemoveLogo } from "../assets/RemoveLogo";
import { checkboxReducer } from "../reducers/checkboxReducer";

export interface Todo {
  selected: boolean;
  content: string;
}

const CheckboxForm = ({
  setValue,
  initialTodos,
  setTodos,
}: {
  setValue: UseFormSetValue<EditorNoteType>;
  initialTodos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const [currentTodo, setCurrentTodo] = useState<string>("");

  const [state, dispatch] = useReducer(checkboxReducer, initialTodos);

  const handleAddTodo = () => {
    if (!currentTodo.trim()) return;
    dispatch({ type: "ADD", content: currentTodo });

    const newTodo = { selected: false, content: currentTodo };
    setTodos((currentTodos) => {
      const updatedTodos = [...currentTodos, newTodo];
      setValue("content", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCurrentTodo("");
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
        value={state.filter((t) => t.selected).map((t) => t.content)}
        lineThrough
        color="success"
        defaultValue={[]}
      >
        {state.map((t, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox
              onValueChange={(isSelected) => {
                dispatch({ type: "CHANGE", index });
                setTodos((currentTodos) => {
                  const updatedTodos = currentTodos.map((todo, i) =>
                    i === index ? { ...todo, selected: isSelected } : todo
                  );
                  setValue("content", JSON.stringify(updatedTodos));
                  return updatedTodos;
                });
              }}
              value={t.content}
            >
              {t.content}
            </Checkbox>
            <button
              type="button"
              onClick={(event) => {
                event?.preventDefault();
                event?.stopPropagation();

                dispatch({ type: "REMOVE", index });
                setTodos((currentTodos) => {
                  const updatedTodos = currentTodos.filter(
                    (_, i) => i !== index
                  );
                  setValue("content", JSON.stringify(updatedTodos));
                  return updatedTodos;
                });
              }}
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
