import { Checkbox, CheckboxGroup } from "@nextui-org/react";

interface Todo {
  selected: boolean;
  content: string;
}

const CheckboxModal = ({ todos }: { todos: Todo[] }) => {
  const selectedValues = todos.filter((t) => t.selected).map((t) => t.content);

  return (
    <CheckboxGroup
      value={selectedValues}
      lineThrough
      color="success"
      isDisabled={true}
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
