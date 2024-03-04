import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Note } from "@prisma/client";
import { useMemo } from "react";

interface Todo {
  selected: boolean;
  content: string;
}

const CheckboxModal = ({
  note,
  isPreviewing,
}: {
  note: Note;
  isPreviewing: boolean;
}) => {
  const { todos, isLong, shortTodos } = useMemo(() => {
    const parsedTodo: Todo[] = JSON.parse(note.content);
    const isLong = parsedTodo.length > 4;
    return {
      todos: parsedTodo,
      isLong,
      shortTodos: isLong ? parsedTodo.slice(0, 4) : parsedTodo,
    };
  }, [note.content]);

  const selectedValues = todos.filter((t) => t.selected).map((t) => t.content);

  return (
    <CheckboxGroup value={selectedValues} lineThrough color="success">
      {(!isPreviewing ? shortTodos : todos).map((t, i) => (
        <Checkbox value={t.content} key={i}>
          {t.content}
        </Checkbox>
      ))}
      {!isPreviewing && isLong && <div>...</div>}
    </CheckboxGroup>
  );
};

export default CheckboxModal;
