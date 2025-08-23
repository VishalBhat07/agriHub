import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  farmerClerkId: { type: String, required: true, ref: "Farmer" },
});

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
