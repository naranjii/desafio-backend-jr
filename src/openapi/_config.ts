import { createDocument } from "zod-openapi";
import { createRequestDto, updateRequestDto } from "../dtos/request.dto";
import z from "zod";

export const openApiDoc = createDocument({
	openapi: "3.1.0",
	info: {
		title: "Desafio Backend JR API",
		version: "1.0.0",
		description:
			"Documentação gerada à partir de Zod schemas e controllers com ZodOpenAPI.",
		contact: {
			name:"M. Laranjeira",
			url:"https://github.com/naranjii",
			email:"matlaranjeira97@gmail.com"
		}
	},
	paths: {
		"/auth/login": {
			post: {
				summary: "User login",
				requestBody: {
					content: {
						// Nao e possivel utilizar o loginDto diretamente aqui devido a atualizacao do Zod 4 de z.email
						"application/json": {
							schema: z.object({ email: z.string(), password: z.string() }),
							example: {
								email: "oi@email.com",
								password: "senha123",
							},
						},
					},
				},

				tags: ["Auth"],
				responses: {
					"200": {
						description: "Login successful",
						content: {
							"application/json": {
								schema: z.object({ token: z.string() }),
								example: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
							},
						},
					},
				},
			},
		},
		"/auth/register": {
			post: {
				summary: "User registration",
				requestBody: {
					content: {
						"application/json": {
							schema: z.object({
								email: z.string(),
								password: z.string(),
								name: z.string(),
							}),
							example: {
								email: "oi@email.com",
								password: "senha123",
								name: "Fulano de Tal",
							},
						},
					},
				},
				tags: ["Auth"],
				responses: {
					"201": {
						description: "User registered",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "user-uuid",
									email: "oi@email.com",
									name: "Fulano de Tal",
									createdAt: "2025-09-13T12:00:00Z",
								},
							},
						},
					},
				},
			},
		},
		"/reports/summary": {
			get: {
				summary: "Get summary report",
				responses: {
					"200": {
						description: "Summary report",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									totalRequests: 42,
									approved: 30,
									rejected: 5,
									draft: 7,
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Reports"],
			},
		},
		"/requests": {
			post: {
				summary: "Create request",
				requestBody: {
					content: {
						"application/json": {
							schema: createRequestDto,
							example: {
								items: [
									{ name: "Laptop", quantity: 2, price: 1200.5 },
									{ name: "Mouse", quantity: 5, price: 25.99 },
								],
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Request created",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "request-uuid",
									items: [
										{ name: "Laptop", quantity: 2, price: 1200.5 },
										{ name: "Mouse", quantity: 5, price: 25.99 },
									],
									status: "draft",
									createdAt: "2025-09-13T12:00:00Z",
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
			get: {
				summary: "List all requests",

				responses: {
					"200": {
						description: "List all requests",
						content: {
							"application/json": {
								schema: z.any(),
								example: [
									{
										id: "request-uuid",
										items: [
											{ name: "Laptop", quantity: 2, price: 1200.5 },
											{ name: "Mouse", quantity: 5, price: 25.99 },
										],
										status: "draft",
										createdAt: "2025-09-13T12:00:00Z",
									},
								],
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
			patch: {
				summary: "Update request",
				requestBody: {
					content: {
						"application/json": { schema: updateRequestDto },
					},
				},

				responses: {
					"200": {
						description: "Request updated",
						content: {
							"application/json": { schema: z.any() },
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
		},
		"/requests/{id}": {
			get: {
				summary: "Get request by ID",
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
					},
				],

				responses: {
					"200": {
						description: "Get request by ID",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "request-uuid",
									items: [
										{ name: "Laptop", quantity: 2, price: 1200.5 },
										{ name: "Mouse", quantity: 5, price: 25.99 },
									],
									status: "draft",
									createdAt: "2025-09-13T12:00:00Z",
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
		},
		"/requests/{id}/submit": {
			post: {
				summary: "Submit request",
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
					},
				],

				responses: {
					"200": {
						description: "Request submitted",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "request-uuid",
									status: "submitted",
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
		},
		"/requests/{id}/approve": {
			post: {
				summary: "Approve request",
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
					},
				],

				responses: {
					"200": {
						description: "Request approved",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "request-uuid",
									status: "approved",
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
		},
		"/requests/{id}/reject": {
			post: {
				summary: "Reject request",
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
					},
				],

				responses: {
					"200": {
						description: "Request rejected",
						content: {
							"application/json": {
								schema: z.any(),
								example: {
									id: "request-uuid",
									status: "rejected",
								},
							},
						},
					},
				},
				security: [{ bearerAuth: [] }],
				tags: ["Requests"],
			},
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
});
