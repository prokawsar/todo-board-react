import { z } from "zod";

export type Todo = {
  id: string;
  title: string;
  description: string;
  category: number;
  user: string;
  expire_at: string;
};

export type Category = {
  id: number;
  name: string;
  user: string;
};

export type History = {
  id: number;
  todo: number;
  from: number;
  to: number;
  created_at: Date;
  updated_at: Date;
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must contain at least 6 characters" })
    .max(12, { message: "Password can contain max 12 characters" }),
});

export type LoginFields = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(12, { message: "Password can contain max 12 characters" }),
    confirm_password: z
      .string({ message: "Confirm password is required" })
      .min(6, {
        message: "Confirm password must contain at least 6 characters",
      })
      .max(12, { message: "Confirm password can contain max 12 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password do not match",
    path: ["confirm_password"],
  });

export type SignupFields = z.infer<typeof signupSchema>;
