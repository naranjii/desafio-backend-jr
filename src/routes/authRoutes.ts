
import * as AuthController from "../controllers/AuthController";
import { loginDto, registerDto } from "../dtos/auth.dto";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { router } from "../router";

router.post(
	"/register",
	validationMiddleware(registerDto),
	AuthController.register,
);
router.post("/login", validationMiddleware(loginDto), AuthController.login);

export default router;
