import express from "express";
import authRoutes from "./routes/authRoutes";
import requestRoutes from "./routes/requestRoutes";
import reportRoutes from "./routes/reportRoutes"

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes)
app.use("/reports", reportRoutes)
export default app;
