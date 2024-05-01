import mongoose from "mongoose";
import stock_model from "../models/stock.model.js";

export const updateStock = async (req, res, next) => {
  try {
    const { medicine, quantityInStock, unitOfMeasure } = req.body;

    // Set supplyDate to the current date if not provided in the request body
    const currentDate = new Date().toLocaleDateString();

    const existingStock = await stock_model.findOne({ medicine: medicine });

    if (existingStock) {
      // Update existing stock quantity
      existingStock.quantityInStock += quantityInStock;
      await existingStock.save();

      res.status(200).json({
        message: 'Stock updated successfully',
        data: existingStock
      });
    } else {
      // Create new stock record
      const newStock = await stock_model.create({
        medicine: medicine,
        supplyDate: currentDate,
        quantityInStock: quantityInStock,
        unitOfMeasure: unitOfMeasure
      });

      res.status(201).json({
        message: 'Stock created successfully',
        data: newStock
      });
    }
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
export const allStock= async(req,res,next) => {
    try {
        const allStocks = await stock_model.find({});
        res.status(200).json({success:true, data:allStocks});
    } catch (error) {
        next(error);
    }
}

export const deleteMedicine = async(req, res,next) => {
    try {
        const deleteMedic = await medicine_model.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message: "Medicine Deleted successfully"});
    } catch (error) {
        next(error);
    }
}
