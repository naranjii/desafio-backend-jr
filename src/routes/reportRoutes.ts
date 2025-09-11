import { Router } from "express";
import * as ReportController from "../controllers/ReportController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/summary", ReportController.summary);

export default router;
