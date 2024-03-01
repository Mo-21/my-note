import { z } from "zod";

export const editorNoteSchema = z.object({
  title: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
});

export type EditorNoteType = z.infer<typeof editorNoteSchema>;
