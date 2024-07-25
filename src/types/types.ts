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
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(15, { message: "Password maximum length is 15" }),
});

export type LoginFields = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(15, { message: "Password maximum length is 15" })
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain mix of digits, letters and any special characters"
      ),
    confirm_password: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password do not match",
    path: ["confirm_password"],
  });

export type SignupFields = z.infer<typeof signupSchema>;
