import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  crops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crop" }],
});

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
