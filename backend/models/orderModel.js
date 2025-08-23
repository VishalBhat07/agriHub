import mongoose from "mongoose";
import { cropSchema } from "../schema/cropSchema";

const orderSchema = new mongoose.Schema({
  buyerClerkId: { type: String, required: true, ref: "Buyer" },
  farmerClerkId: { type: String, required: true, ref: "Farmer" },
  crops: [cropSchema],
  status: {
    type: String,
    enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
