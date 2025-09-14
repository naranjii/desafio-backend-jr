import z from "zod";

export const createRequestDto = z.object({
	items: z.array(
		z.object({
			name: z.string(),
			quantity: z.number().min(1),
			price: z.number().positive(),
		}),
	),
});

export type CreateRequestDto = z.infer<typeof createRequestDto>;

export const updateRequestDto = z.object({
	...createRequestDto.shape,
});

export type UpdateRequestDto = z.infer<typeof updateRequestDto>;
