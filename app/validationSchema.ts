import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "Username must be a string" })
      .max(255, "Username can be max 255 char")
      .min(1, "Username can be max 255 char"),
    email: z
      .string()
      .email("Invalid Email")
      .max(255, "Email can be max 255 char")
      .min(10, "Email can be min 255 char"),
    avatar: z.string().optional().nullable(),
    password: z
      .string()
      .min(1, "Password is Required")
      .min(8, "Password must be at least 8 characters long")
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[^a-zA-Z\d]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    passwordConfirmation: z
      .string()
      .min(1, "Password Confirmation is Required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
