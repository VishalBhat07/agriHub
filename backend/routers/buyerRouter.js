import express from "express";
import Buyer from "../models/buyerModel.js";
import Order from "../models/orderModel.js";
import Crop from "../models/cropModel.js";

const buyerRouter = express.Router();

// 1. Add buyer (create account)
buyerRouter.post("/add", async (req, res) => {
  try {
    const { clerkId, emailId } = req.body;
    const buyer = new Buyer({ clerkId, emailId, orders: [] });
    await buyer.save();
    res.status(201).json({ message: "Buyer added successfully", buyer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Place an order
buyerRouter.post("/:clerkId/orders/place", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { farmerClerkId, crops } = req.body;
    // crops: [{ cropId, quantity }, ...]

    const buyer = await Buyer.findOne({ clerkId });
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    // Create new order
    const order = new Order({
      buyerClerkId: clerkId,
      farmerClerkId,
      crops,
      status: "pending",
      orderDate: new Date(),
    });
    await order.save();

    // Add order reference to buyer's orders
    buyer.orders.push(order._id);
    await buyer.save();

    // Ideally, also push order id to Farmer orders array (not shown here)

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Fetch all previous orders by that buyer
buyerRouter.get("/:clerkId/orders", async (req, res) => {
  try {
    const { clerkId } = req.params;

    const orders = await Order.find({ buyerClerkId: clerkId }).populate(
      "crops.cropId"
    );
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { buyerRouter };
