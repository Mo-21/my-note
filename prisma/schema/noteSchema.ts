import { z } from "zod";

export const newNoteSchema = z.object({
  title: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
});

export type NewNoteType = z.infer<typeof newNoteSchema>;
