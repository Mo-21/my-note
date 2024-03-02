import { Checkbox, CheckboxGroup } from "@nextui-org/react";

interface Todo {
  selected: boolean;
  content: string;
}

const CheckboxModal = ({
  todos,
  isDisabled,
}: {
  todos: Todo[];
  isDisabled: boolean;
}) => {
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
