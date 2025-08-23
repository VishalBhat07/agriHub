import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  certificationBody: String,
  certificateNumber: String,
  certificationDate: Date,
  expiryDate: Date,
  verified: Boolean,
  documentUrl: String,
});

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  certified: { type: Boolean, default: false },
  certificationDetails: certificationSchema,
  clerkId: String,
});

export default mongoose.model("Equipment", equipmentSchema);
