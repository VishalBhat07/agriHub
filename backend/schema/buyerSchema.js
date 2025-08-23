import mongoose from "mongoose";

const { Schema } = mongoose;

const buyerSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export { buyerSchema };
