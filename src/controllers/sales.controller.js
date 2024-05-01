import mongoose from 'mongoose';
import Outflow from '../models/sales.model.js';
import stock_model from '../models/stock.model.js'; // Assuming your Stock model path

export const createOutflow = async (req, res, next) => {
  try {
    const { medicines, quantity, unitOfMeasure, OutflowDate } = req.body;

    // Validate outflow data (optional)

    const outflowItems = [];
    for (let i = 0; i < medicines.length; i++) {
      const medicineId = medicines[i].medicineId;
      const outflowQuantity = quantity[i];

      // Check if medicine exists in stock
      const existingStock = await stock_model.findOne({ medicine: medicineId });
      if (!existingStock) {
        return res.status(400).json({ message: `Medicine with ID ${medicineId} not found in stock` });
      }

      // Validate sufficient stock quantity
      if (existingStock.quantityInStock < outflowQuantity) {
        return res.status(400).json({ message: `Insufficient stock for medicine with ID ${medicineId}` });
      }

      // Update stock quantity
      existingStock.quantityInStock -= outflowQuantity;
      await existingStock.save();

      outflowItems.push({ medicineId, quantity: outflowQuantity, unitOfMeasure });
    }

    // Create a new outflow record
    const newOutflow = new Outflow({ medicines: outflowItems, OutflowDate });
    const savedOutflow = await newOutflow.save();

    res.status(201).json({
      message: 'Outflow (sale) created successfully',
      data: savedOutflow
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};