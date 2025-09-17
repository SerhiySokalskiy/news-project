import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(4, "Minimum 4 symbols"),
});

export const registerSchema = z.object({
	name: z.string().min(2, "Minimum 2 symbols"),
	email: z.string().email("invalid email"),
	password: z.string().min(4, "Minimum 4 symbols"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
