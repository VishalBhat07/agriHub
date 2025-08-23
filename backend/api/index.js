import express from "express";
import cors from "cors";
import { geminiRouter } from "../routers/geminiRouter.js";
import { buyerRouter } from "../routers/buyerRouter.js";
import { farmerRouter } from "../routers/farmerRouter.js";
import { userRouter } from "../routers/userRouter.js";
import { equipmentRouter } from "../routers/equipmentRouter.js";
import { connectDB } from "../utils/connectDB.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

connectDB();

app.use("/api/gemini", geminiRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/user", userRouter);
app.use("/api/equipment", equipmentRouter);

// Export as Vercel serverless function handler
export default app;
