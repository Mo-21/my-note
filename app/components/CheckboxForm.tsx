"use client";
import { EditorNoteType } from "@/prisma/schema/editorNoteSchema";
import {
  useState,
  useReducer,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react";
import { UseFormSetValue } from "react-hook-form";
import { Button, Input, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { RemoveLogo } from "../assets/RemoveLogo";
import { CheckboxAction, checkboxReducer } from "../reducers/checkboxReducer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import GripIcon from "../assets/GripIcon";

export interface Todo {
  id: string;
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleAddTodo = () => {
    if (!currentTodo.trim()) return;
    const todoID = uuidv4();

    dispatch({ type: "ADD", content: currentTodo, id: todoID });

    const newTodo = { selected: false, content: currentTodo, id: todoID };
    setTodos((currentTodos) => {
      const updatedTodos = [...currentTodos, newTodo];
      setValue("content", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCurrentTodo("");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((currentTodos) => {
        const oldIndex = currentTodos.findIndex(
          (todo) => todo.id === active.id
        );
        const newIndex = currentTodos.findIndex((todo) => todo.id === over.id);
        return arrayMove(currentTodos, oldIndex, newIndex);
      });
    }
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={state.map((todo) => todo.id)}>
          <CheckboxGroup
            value={state.filter((t) => t.selected).map((t) => t.content)}
            lineThrough
            color="success"
            defaultValue={[]}
          >
            {initialTodos.map((todo, index) => (
              <SortableTodoItem
                key={index}
                id={todo.id}
                content={todo.content}
                selected={todo.selected}
                index={index}
                dispatch={dispatch}
                setTodos={setTodos}
                setValue={setValue}
              />
            ))}
          </CheckboxGroup>
        </SortableContext>
      </DndContext>
    </>
  );
};

interface SortableTodoItemProps {
  id: string;
  content: string;
  selected: boolean;
  index: number;
  dispatch: Dispatch<CheckboxAction>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setValue: UseFormSetValue<EditorNoteType>;
}

export const SortableTodoItem = ({
  id,
  content,
  selected,
  index,
  dispatch,
  setTodos,
  setValue,
}: SortableTodoItemProps): ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2">
      <div {...listeners} {...attributes} className="drag-handle">
        <GripIcon height={22} width={22} />
      </div>
      <Checkbox
        checked={selected}
        onValueChange={(isSelected) => {
          dispatch({ type: "CHANGE", id, selected: isSelected });
          setTodos((currentTodos) => {
            const updatedTodos = currentTodos.map((todo, i) =>
              i === index ? { ...todo, selected: isSelected } : todo
            );
            setValue("content", JSON.stringify(updatedTodos));
            return updatedTodos;
          });
        }}
        value={content}
      >
        {content}
      </Checkbox>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          dispatch({ type: "REMOVE", id });
          setTodos((currentTodos) =>
            currentTodos.filter((_, i) => i !== index)
          );
        }}
        className="bg-red-500 rounded-md"
      >
        <RemoveLogo width={22} height={22} />
      </button>
    </div>
  );
};

export default CheckboxForm;
