import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  buyerClerkId: { type: String, required: true, ref: "Buyer" },
  farmerClerkId: { type: String, required: true, ref: "Farmer" },
  crop: { type: Schema.Types.ObjectId, required: true, ref: "Crop" },
  status: {
    type: String,
    enum: ["pending", "accepted", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
});

export { orderSchema };
