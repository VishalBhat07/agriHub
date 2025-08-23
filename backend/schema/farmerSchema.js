import mongoose from "mongoose";

const { Schema } = mongoose;

const farmerSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  crops: [{ type: Schema.Types.ObjectId, ref: "Crop" }],
});

export { farmerSchema };
