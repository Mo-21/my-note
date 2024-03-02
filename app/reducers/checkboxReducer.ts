import { Todo } from "../components/CheckboxForm";

interface AddTodo {
  type: "ADD";
  content: string;
}

interface RemoveTodo {
  type: "REMOVE";
  index: number;
}

interface ChangeTodo {
  type: "CHANGE";
  index: number;
}

type CheckboxAction = AddTodo | RemoveTodo | ChangeTodo;

export const checkboxReducer = (
  state: Todo[],
  action: CheckboxAction
): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [...state, { selected: false, content: action.content }];
    case "CHANGE":
      return state.map((todo, index) =>
        index === action.index ? { ...todo, selected: !todo.selected } : todo
      );
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};
