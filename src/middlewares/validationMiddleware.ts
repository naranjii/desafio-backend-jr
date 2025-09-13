import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validationMiddleware(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.issues.map((issue: any) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res.status(422).json({ error: "Invalid data", details: errorMessages });
			} else {
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	};
}
