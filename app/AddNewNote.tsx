"use client";
import "easymde/dist/easymde.min.css";
import { Button, ButtonGroup } from "@nextui-org/react";
import "./globals.css";
import NewNoteForm from "./components/NewNoteForm";
import { useReducer } from "react";
import QuickNoteForm from "./components/QuickNoteForm";
import { createNoteReducer } from "./reducers/createNoteReducer";

const AddNewNote = () => {
  const [state, dispatch] = useReducer(createNoteReducer, {
    quickNote: false,
    editor: false,
    checkbox: false,
  });

  return (
    <div>
      <div className="flex justify-evenly items-center px-4 mt-3">
        <ButtonGroup variant="ghost" className="flex">
          <Button onClick={() => dispatch({ type: "QUICK_NOTE" })}>
            Quick Note
          </Button>
          <Button onClick={() => dispatch({ type: "EDITOR" })}>Editor</Button>
          <Button onClick={() => dispatch({ type: "CHECKBOX" })}>
            Checkbox
          </Button>
        </ButtonGroup>
        {state.quickNote ? (
          <QuickNoteForm
            isOpen={true}
            onClose={() => dispatch({ type: "CLOSE" })}
          />
        ) : state.editor ? (
          <NewNoteForm
            isOpen={true}
            onClose={() => dispatch({ type: "CLOSE" })}
            isUpdating={false}
          />
        ) : state.checkbox ? (
          ""
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddNewNote;
