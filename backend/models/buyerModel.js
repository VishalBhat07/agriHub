import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
