import mongoose from "mongoose";
import stock_model from "../models/stock.model.js";
import { validationResult } from "express-validator";
import {NotFoundError, BadRequestError} from '../errors/index.js';
import asyncWrapper from "../middlewares/async.js";

export const updateStock = asyncWrapper( async (req, res, next) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()){
   return next(new BadRequestError(errors.array()[0].msg));
 }
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
  
});
export const allStock=  asyncWrapper(async(req,res,next) => {
   
        const allStocks = await stock_model.find({});
        if(allStocks){
        res.status(200).json({success:true, data:allStocks});
        }
});

export const deleteStock =  asyncWrapper(async(req, res,next) => {
    
        const deleteStoxk = await stock_model.findByIdAndDelete(req.params.id);
        if (!deleteStoxk) {
            return next (new NotFoundError("Stock not found"))
        }
        res.status(200).json({success:true, message: "Stock Deleted successfully"});
   
});

export const getStockById =  asyncWrapper(async (req, res) => {
 
     const stock = await stock_model.findById(req.params.id);
     if (!stock) {
       return next(new NotFoundError("Stock not found"))
      }
       else{
        res.status(200).json({success:true, data:stock})
       }
 
  });

