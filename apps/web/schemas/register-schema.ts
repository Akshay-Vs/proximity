import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
});