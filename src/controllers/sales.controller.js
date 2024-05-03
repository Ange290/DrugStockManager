import mongoose from 'mongoose';
import Outflow from '../models/sales.model.js';
import stock_model from '../models/stock.model.js'; // Assuming your Stock model path


export const createOutflow = async (req, res, next) => {
    try {
        const { medicine, quantityInStock, unitOfMeasure, OutflowDate } = req.body;

        // Find stock record by medicine name
        let existingStock = await stock_model.findOne({ medicine });

        if (!existingStock) {
            // If the stock record doesn't exist, return an error
            return res.status(404).json({ message: 'Stock not found' });
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
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
       }      

       export const listSale = async(req,res,next) =>{
        try {
            const allSale = await Outflow.find({});
            res.status(200).json({success:true, data:allSale});
        } catch (error) {
            next(error);
        }
       }

       export const deleteSale = async(req, res,next) => {
        try {
            const deleteSale = await Outflow.findByIdAndDelete(req.params.id);
            res.status(200).json({success:true, message: "Sale Deleted successfully"});
        } catch (error) {
            next(error);
        }
       }

      