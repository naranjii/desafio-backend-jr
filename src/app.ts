import express from "express";
import authRoutes from "./routes/authRoutes";
import requestRoutes from "./routes/requestRoutes";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes)
export default app;
