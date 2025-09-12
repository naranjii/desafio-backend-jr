import { Router } from "express";
import * as RequestController from "../controllers/RequestController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
router.use(authMiddleware);
router.get("/", RequestController.list);
router.get("/:id", RequestController.getById);
router.post("/", RequestController.create);
router.post("/:id/submit", RequestController.submit)
router.post("/:id/approve", RequestController.approve);
router.post("/:id/reject", RequestController.reject);
router.patch("/:id", RequestController.update);
export default router;
