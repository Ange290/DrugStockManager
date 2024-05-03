import mongoose from 'mongoose';
import Outflow from '../models/sales.model.js';
import stock_model from '../models/stock.model.js'; // Assuming your Stock model path
import {NotFoundError , BadRequestError}  from '../errors/index.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const createOutflow =  asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
        const { medicine, quantityInStock, unitOfMeasure, OutflowDate } = req.body;

        // Find stock record by medicine name
        let existingStock = await stock_model.findOne({ medicine });

        if (!existingStock) {
            // If the stock record doesn't exist, return an error
            return  next (new NotFoundError('Stock not found' ));
        }

        // Reduce the quantity of the existing stock
        existingStock.quantityInStock -= quantityInStock;
        await existingStock.save();

        // Create a new Outflow record
        const newOutflow = new Outflow({ medicine, quantityInStock, unitOfMeasure, OutflowDate });
        const savedOutflow = await newOutflow.save();

        res.status(201).json({
            message: 'Outflow (sale) created successfully',
            data: savedOutflow
        });
   
       })     

       export const listSale =  asyncWrapper(async(req,res,next) =>{
           const allSale = await Outflow.find({});
            res.status(200).json({success:true, data:allSale});
      
       });

       export const deleteSale =  asyncWrapper(async(req, res,next) => {
       
            const deleteSale = await Outflow.findByIdAndDelete(req.params.id);
            if (!deleteSale) {
                return next (new NotFoundError("Sale not found"))
            }
            res.status(200).json({success:true, message: "Sale Deleted successfully"});

       });

      