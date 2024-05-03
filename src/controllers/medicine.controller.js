
import { validationResult } from 'express-validator';
import {NotFoundError, BadRequestError} from '../errors/index.js';
import medicine_model from "../models/medicine.model.js";
import {validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

// Function to create a new medicine
export const createMedicine = asyncWrapper (async(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.error(errors.array());
    return next(new BadRequestError(errors.array()[0].msg));
  }
      const newMedicine = new medicine_model(req.body);
      await newMedicine.save();
      res.status(201).json({
        success: true,
        data: newMedicine,
        message: "Medicine created successfully"
      });
   });
  
  // Function to get all medicines
  export const getMedicines =  asyncWrapper(async (req, res, next) => {
  const medicines = await medicine_model.find().populate('supply'); // Populate supplier details
      res.status(200).json({
        success: true,
        data: medicines,
        message: "Medicines retrieved successfully"
      });
   
  });
  
  // Function to get a medicine by ID
  export const getMedicineById = asyncWrapper( async (req, res, next) => {
   
      
      const medicine = await medicine_model.findById(req.params.id)
      if (!medicine) {
        return next(new NotFoundError("Medicine not found" ));
      }
      res.status(200).json({
        success: true,
        data: medicine,
        message: "Medicine retrieved successfully"
      });
  
  });
  
  // Function to update a medicine by ID
  export const updateMedicine =  asyncWrapper(async (req, res, next) => {
    
      const medicineId = req.params.medicineId;
      const updatedMedicine = await medicine_model.findByIdAndUpdate(medicineId, req.body, { new: true }); // Return the updated object
      if (!updatedMedicine) {
        return next(new NotFoundError( "Medicine not found" ));
      }
      res.status(200).json({
        success: true,
        data: updatedMedicine,
        message: "Medicine updated successfully"
      });
  
  });
 export const deleteMedicine = asyncWrapper(async(req, res, next) => {
 
    const medicineId = req.params.medicineId;
    const deletedMedicine = await medicine_model.findByIdAndDelete(medicineId);
    if (!deletedMedicine) {
      return next(new NotFoundError("Medicine not found" ));
    }
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
 
 });