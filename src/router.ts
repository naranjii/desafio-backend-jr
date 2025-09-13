import { Router } from "express";
import { logMiddleware } from "./middlewares/logMiddleware";

export const router = Router();
router.use(logMiddleware);
