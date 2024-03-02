import { EditorNoteType } from "@/prisma/schema/editorNoteSchema";
import { Note } from "@prisma/client";
import dynamic from "next/dynamic";
import { Control, Controller } from "react-hook-form";

const Editor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NoteEditorForm = ({
  control,
  note,
}: {
  control: Control<EditorNoteType>;
  note: Note | null | undefined;
}) => {
  const options = {
    toolbar: [
      "bold",
      "italic",
      "heading",
      "|",
      "unordered-list",
      "ordered-list",
      "|",
      "code",
      "quote",
      "link",
      "|",
      "undo",
      "redo",
      "|",
      "preview",
    ] as any,
    scrollbarStyle: "native",
  };
  return (
    <Controller
      name="content"
      control={control}
      defaultValue={note?.content}
      render={({ field }) => (
        <Editor placeholder="Note" options={options} {...field} />
      )}
    />
  );
};

export default NoteEditorForm;
