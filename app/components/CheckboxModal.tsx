import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Note } from "@prisma/client";
import { useMemo } from "react";

interface Todo {
  selected: boolean;
  content: string;
}

const CheckboxModal = ({
  note,
  isDisabled,
}: {
  note: Note;
  isDisabled: boolean;
}) => {
  const todos: Todo[] = useMemo(() => {
    return JSON.parse(note.content);
  }, [note.content]);

  const selectedValues = todos.filter((t) => t.selected).map((t) => t.content);

  return (
    <CheckboxGroup
      value={selectedValues}
      lineThrough
      color="success"
      isDisabled={isDisabled}
    >
      {todos.map((t, i) => (
        <Checkbox value={t.content} key={i}>
          {t.content}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default CheckboxModal;
