import express from "express";
import authRoutes from "./routes/authRoutes";
import requestRoutes from "./routes/requestRoutes";
import reportRoutes from "./routes/reportRoutes";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./openapi/_config";
import { logMiddleware } from "./middlewares/logMiddleware";

const app = express();
app.use(express.json());
app.use(logMiddleware)
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
app.use("/reports", reportRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
export default app;
