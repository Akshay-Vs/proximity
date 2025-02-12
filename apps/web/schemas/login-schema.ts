import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
  // .min(8)
  // .regex(/[A-Z]/, "Must contain uppercase")
  // .regex(/[a-z]/, "Must contain lowercase")
  // .regex(/[0-9]/, "Must contain number")
  // .regex(/[^A-Za-z0-9]/, "Must contain special character")
});