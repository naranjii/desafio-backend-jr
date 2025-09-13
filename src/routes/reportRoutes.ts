import * as ReportController from "../controllers/ReportController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { router } from "../router";

router.use(authMiddleware);

router.get("/summary", ReportController.summary);

export default router;
