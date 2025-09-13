import { Router } from "express";
import * as AuthController from "../controllers/AuthController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { loginDto, registerDto } from "../dtos/auth.dto";

const router = Router();

router.post(
	"/register",
	validationMiddleware(registerDto),
	AuthController.register,
);
router.post("/login", validationMiddleware(loginDto), AuthController.login);

export default router;
