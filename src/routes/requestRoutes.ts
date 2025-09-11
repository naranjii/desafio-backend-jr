import { Router } from "express";
import * as RequestController from "../controllers/RequestController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
router.use(authMiddleware);
router.post("/", RequestController.create);
router.get("/", RequestController.list);
router.get("/:id", RequestController.getById);
export default router;
