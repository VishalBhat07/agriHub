import express from "express";
import Farmer from "../models/farmerModel.js";
import Crop from "../models/cropModel.js";
import Order from "../models/orderModel.js";

const farmerRouter = express.Router();

// 1. Add farmer (create account)
farmerRouter.post("/add", async (req, res) => {
  try {
    const { clerkId, emailId } = req.body;
    const farmer = new Farmer({
      clerkId,
      emailId,
      orders: [],
      crops: [],
    });
    await farmer.save();
    res.status(201).json({ message: "Farmer added successfully", farmer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Add crops by a farmer
farmerRouter.post("/:clerkId/crops/add", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { name, variety, price, quantity, location } = req.body;
    const farmer = await Farmer.findOne({ clerkId });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const crop = new Crop({
      name,
      variety,
      price,
      quantity,
      location,
      farmerClerkId: clerkId,
    });
    await crop.save();

    farmer.crops.push(crop._id);
    await farmer.save();

    res.status(201).json({ message: "Crop added successfully", crop });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Fetch crops uploaded by farmer
farmerRouter.get("/:clerkId/crops", async (req, res) => {
  try {
    const { clerkId } = req.params;
    console.log("clerk:", clerkId);
    const crops = await Crop.find({ farmerClerkId: clerkId });
    res.json(crops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Edit crop uploaded by farmer
farmerRouter.put("/:clerkId/crops/:cropId", async (req, res) => {
  try {
    const { clerkId, cropId } = req.params;
    const { name, variety, price, quantity, location } = req.body;

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId, farmerClerkId: clerkId },
      { name, variety, price, quantity, location },
      { new: true }
    );

    if (!crop)
      return res
        .status(404)
        .json({ message: "Crop not found or unauthorized" });

    res.json({ message: "Crop updated successfully", crop });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete crop uploaded by farmer
farmerRouter.delete("/:clerkId/crops/:cropId", async (req, res) => {
  try {
    const { clerkId, cropId } = req.params;
    const crop = await Crop.findOneAndDelete({
      _id: cropId,
      farmerClerkId: clerkId,
    });
    if (!crop)
      return res
        .status(404)
        .json({ message: "Crop not found or unauthorized" });

    // Also remove from farmer's crops array
    await Farmer.updateOne({ clerkId }, { $pull: { crops: cropId } });

    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Fetch orders placed to that farmer
farmerRouter.get("/:clerkId/orders", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const orders = await Order.find({ farmerClerkId: clerkId });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 7. Update order status of a particular order
farmerRouter.put("/:clerkId/orders/:orderId/status", async (req, res) => {
  try {
    const { clerkId, orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, farmerClerkId: clerkId },
      { status },
      { new: true }
    );

    if (!order)
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 8. Fetch all crops from all farmers
farmerRouter.get("/crops/all", async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.json(crops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { farmerRouter };
