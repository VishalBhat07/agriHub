import express from "express";
import Equipment from "../models/equipmentModel.js"; // your Mongoose model

const equipmentRouter = express.Router();

// GET all equipment
equipmentRouter.get("/", async (req, res) => {
  try {
    const equipmentList = await Equipment.find({});
    res.json(equipmentList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single equipment by id
equipmentRouter.get("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Not found" });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new equipment
equipmentRouter.post("/", async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT to update certification info
equipmentRouter.put("/:id/certification", async (req, res) => {
  try {
    const {
      certificationBody,
      certificateNumber,
      certificationDate,
      expiryDate,
      verified,
      documentUrl,
    } = req.body;

    const updated = await Equipment.findByIdAndUpdate(
      req.params.id,
      {
        certified: true,
        certificationDetails: {
          certificationBody,
          certificateNumber,
          certificationDate,
          expiryDate,
          verified,
          documentUrl,
        },
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE equipment
equipmentRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { equipmentRouter };
