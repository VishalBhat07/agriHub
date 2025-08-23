import express from "express";
import Buyer from "../models/buyerModel.js";
import Farmer from "../models/farmerModel.js";

const userRouter = express.Router();

userRouter.get("/:clerkId", async (req, res) => {
  const { clerkId } = req.params;
  console.log(clerkId);
  try {
    const farmer = await Farmer.findOne({ clerkId });
    if (farmer) {
      return res.json({ role: "farmer", profile: farmer });
    }

    const buyer = await Buyer.findOne({ clerkId });
    if (buyer) {
      return res.json({ role: "buyer", profile: buyer });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Error searching user:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export { userRouter };
