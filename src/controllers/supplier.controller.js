import supplier_model from "../models/supplier.model.js"; 
import { validationResult } from "express-validator";
import {NotFoundError, BadRequestError} from '../errors/index.js';
import asyncWrapper from "../middlewares/async.js";

export const addSupplier =  asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
        const addSupplier = await supplier_model.create(req.body);
        res.status(201).json({success: true, data: addSupplier, message:"Supplier created successfully"});
   
});

export const getSuppliers =  asyncWrapper(async (req, res, next) => {
    
        const suppliers = await supplier_model.find({});
        if (!suppliers) {
            return next ( new NotFoundError(`Supplier not found`))
        }
            res.status(200).json({success: true, data: suppliers, message:"Supply fetched successfully"});
        
   
});

export const getSupplierById = asyncWrapper( async (req, res, next) => {
   
        const supplier = await supplier_model.findById(req.params.id);
        if (!supplier) {
            return next (new NotFoundError("Supply not found"))
        }
           
            res.status(200).json({success: true, data: supplier, message:"Supplier fetched successfully"});
        
 
});

export const updateSupplier =  asyncWrapper(async (req, res, next) => {
  
        const updatedSupplier = await supplier_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSupplier) {
            return next (new NotFoundError("Supply not found"))
        }
           
            res.status(200).json({success: true, data: updatedSupplier, message:"Supplier updated successfully"});
      
});

export const deleteSupplier =  asyncWrapper(async (req, res, next) => {
   
        const deletedSupplier = await supplier_model.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return next (new NotFoundError("Supply not found"))
        }           
            res.status(200).json({success: true, message:"Supplier deleted successfully"});
        
});