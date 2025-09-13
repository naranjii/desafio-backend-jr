import { Router } from "express";
import * as RequestController from "../controllers/RequestController";
import * as ItemController from "../controllers/ItemController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
const router = Router();

router.use(authMiddleware);

router.get("/", RequestController.list);
router.get("/:id", RequestController.getById);

router.post("/", RequestController.create);
router.post("/:id/submit", RequestController.submit)
// approver role routes:

router.patch("/:id", roleMiddleware, ItemController.update);
router.post("/:id/approve", roleMiddleware, RequestController.approve);
router.post("/:id/reject", roleMiddleware, RequestController.reject);
export default router;
