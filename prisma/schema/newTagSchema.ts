import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type NewTagSchemaType = z.infer<typeof tagSchema>;
