import mongoose from "mongoose";

const { Schema } = mongoose;

const cropSchema = new Schema({
  name: { type: String, required: true },
  variety: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  farmerClerkId: { type: String, required: true, ref: "Farmer" },
});

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
