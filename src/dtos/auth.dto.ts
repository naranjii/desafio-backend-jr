import z from "zod";

export const registerDto = z.object({
	email: z.email(),
	name: z.string().min(4),
	password: z.string().min(6),
});

export type RegisterDto = z.infer<typeof registerDto>;

export const loginDto = z.object({
	email: z.email(),
	password: z.string(),
});

export type LoginDto = z.infer<typeof loginDto>;
