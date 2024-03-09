import { Todo } from "../components/CheckboxForm";

interface AddTodo {
  type: "ADD";
  content: string;
  id: string;
}

interface RemoveTodo {
  type: "REMOVE";
  id: string;
}

interface ChangeTodo {
  type: "CHANGE";
  id: string;
  selected: boolean;
}

export type CheckboxAction = AddTodo | RemoveTodo | ChangeTodo;

export const checkboxReducer = (
  state: Todo[],
  action: CheckboxAction
): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: action.id, selected: false, content: action.content },
      ];
    case "CHANGE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, selected: action.selected } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};
