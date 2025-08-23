import mongoose from "mongoose";

const { Schema } = mongoose;

const cropSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  farmerClerkId: { type: String, required: true, ref: "Farmer" },
});

export { cropSchema };
