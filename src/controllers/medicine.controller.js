import medicine_model from "../models/medicine.model.js";

// Function to create a new medicine
export const createMedicine = async (req, res, next) => {
    try {
      const newMedicine = new medicine_model(req.body);
      await newMedicine.save();
      res.status(201).json({
        success: true,
        data: newMedicine,
        message: "Medicine created successfully"
      });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
  
  // Function to get all medicines
  export const getMedicines = async (req, res, next) => {
    try {
      const medicines = await medicine_model.find().populate('supply'); // Populate supplier details
      res.status(200).json({
        success: true,
        data: medicines,
        message: "Medicines retrieved successfully"
      });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
  
  // Function to get a medicine by ID
  export const getMedicineById = async (req, res, next) => {
    try {
      
      const medicine = await medicine_model.findById(req.params.id)
      if (!medicine) {
        return res.status(404).json({ message: "Medicine not found" });
      }
      res.status(200).json({
        success: true,
        data: medicine,
        message: "Medicine retrieved successfully"
      });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
  
  // Function to update a medicine by ID
  export const updateMedicine = async (req, res, next) => {
    try {
      const medicineId = req.params.medicineId;
      const updatedMedicine = await medicine_model.findByIdAndUpdate(medicineId, req.body, { new: true }); // Return the updated object
      if (!updatedMedicine) {
        return res.status(404).json({ message: "Medicine not found" });
      }
      res.status(200).json({
        success: true,
        data: updatedMedicine,
        message: "Medicine updated successfully"
      });
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
 export const deleteMedicine =async(req, res, next) => {
  try {
    const medicineId = req.params.medicineId;
    const deletedMedicine = await medicine_model.findByIdAndDelete(medicineId);
    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
 }