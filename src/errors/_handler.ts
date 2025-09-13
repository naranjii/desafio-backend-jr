import { Response } from "express";
import { ApplicationError } from "./_app.error";

export const errorSerializer = {
	APP_ERROR: 400,
	NOT_FOUND: 404,
	INVALID_PAYLOAD: 422,
	UNAUTHENTICATED: 401,
	UNAUTHORIZED: 403,
	CONFLICT: 409,
};

export function errorHandler(error: unknown, res: Response) {
	if (!(error instanceof ApplicationError)) return res.status(500).json(error);

	res.status(errorSerializer[error.code]).json(error.message);
}
