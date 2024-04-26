import supplier_model from "../models/supplier.model.js"; 

export const addSupplier = async (req, res, next) => {
    try {
        const addSupplier = await supplier_model.create(req.body);
        res.status(201).json({success: true, data: addSupplier, message:"Supplier created successfully"});
    } catch (error) {
        next(error);
    }
}

export const getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await supplier_model.find({});
        if (suppliers) {
            res.status(200).json({success: true, data: suppliers, message:"Supply fetched successfully"});
        }
    } catch (error) {
        next(error);
    }
}

export const getSupplierById = async (req, res, next) => {
    try {
        const supplier = await supplier_model.findById(req.params.id);
        if (supplier) {
            res.status(404).json({success:false, message:"Supply not found"})}
            else {
            res.status(200).json({success: true, data: supplier, message:"Supplier fetched successfully"});
        }
    } catch (error) {
        next(error);
    }
}

export const updateSupplier = async (req, res, next) => {
    try {
        const updatedSupplier = await supplier_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedSupplier) {
            res.status(404).json({success:false, message:"Supply not found"})}
            else {
            res.status(200).json({success: true, data: updatedSupplier, message:"Supplier updated successfully"});
        }
    } catch (error) {
        next(error);
    }
}

export const deleteSupplier = async (req, res, next) => {
    try {
        const deletedSupplier = await supplier_model.findByIdAndDelete(req.params.id);
        if (deletedSupplier) {
            res.status(404).json({success:false, message:"Supply not found"})}
            else {
            res.status(200).json({success: true, message:"Supplier deleted successfully"});
        }
    } catch (error) {
        next(error);
    }
}