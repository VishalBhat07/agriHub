import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { geminiRouter } from "./routers/geminiRouter.js";
import { buyerRouter } from "./routers/buyerRouter.js";
import { farmerRouter } from "./routers/farmerRouter.js";
import { connectDB } from "./utils/connectDB.js";
import { userRouter } from "./routers/userRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5714;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"], // specify allowed methods (optional)
  })
);

app.use(express.json());

connectDB();

app.use("/api/gemini", geminiRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
