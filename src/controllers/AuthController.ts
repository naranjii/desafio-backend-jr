import { Request, Response } from "express";
import * as AuthService from "../services/AuthService";
import { TypedRequest } from "../interfaces/TypedRequest";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { errorHandler } from "../errors/_handler";

export async function register(req: TypedRequest<RegisterDto>, res: Response) {
	const { name, email, password } = req.body;
	try {
		const user = await AuthService.register({ name, email, password });
		res.status(201).json(user);
	} catch (err) {
		return errorHandler(err, res);
	}
}

export async function login(req: TypedRequest<LoginDto>, res: Response) {
	const { email, password } = req.body;
	try {
		const token = await AuthService.login(email, password);
		res.json({ token });
	} catch (err) {
		return errorHandler(err, res);
	}
}
