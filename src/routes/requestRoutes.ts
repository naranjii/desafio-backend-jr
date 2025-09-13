import { Router } from "express";
import * as RequestController from "../controllers/RequestController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { createRequestDto, updateRequestDto } from "../dtos/request.dto";

const router = Router();

router.use(authMiddleware);

router.get("/", RequestController.list);
router.get("/:id", RequestController.getById);

router.post(
	"/",
	validationMiddleware(createRequestDto),
	RequestController.create,
);
router.patch(
	"/:id",
	validationMiddleware(updateRequestDto),
	RequestController.update,
);

router.post("/:id/submit", RequestController.submit);
router.post("/:id/approve", roleMiddleware, RequestController.approve);
router.post("/:id/reject", roleMiddleware, RequestController.reject);
export default router;
