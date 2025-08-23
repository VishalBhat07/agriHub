import express from "express";
import cors from "cors";
import { geminiRouter } from "./routers/geminiRouter.js";
import { buyerRouter } from "./routers/buyerRouter.js";
import { farmerRouter } from "./routers/farmerRouter.js";
import { userRouter } from "./routers/userRouter.js";
import { equipmentRouter } from "./routers/equipmentRouter.js";
import { connectDB } from "./utils/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

app.use(express.json());

connectDB();

app.use("/api/gemini", geminiRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/user", userRouter);
app.use("/api/equipment", equipmentRouter);

app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
