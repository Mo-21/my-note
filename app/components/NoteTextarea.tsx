import { EditorNoteType } from "@/prisma/schema/editorNoteSchema";
import { Textarea } from "@nextui-org/react";
import { Note } from "@prisma/client";
import { UseFormRegister } from "react-hook-form";

const NoteTextarea = ({
  register,
  note,
}: {
  register: UseFormRegister<EditorNoteType>;
  note: Note | null | undefined;
}) => {
  return (
    <Textarea
      fullWidth
      label="Quick Note"
      defaultValue={note?.content}
      minRows={20}
      maxRows={100}
      style={{
        fontSize: "18px",
      }}
      {...register("content")}
    />
  );
};

export default NoteTextarea;
