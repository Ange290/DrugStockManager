import medicine_model from "../models/medicine.model.js";

export const updateMedicine = async (req, res, next) => {
    try {
        const { name, batchNo, expiredDate, quantityInStock } = req.body;

        // Find the medicine by name, not by req.params.name
        const updateMedic = await medicine_model.findOne({ name });

        if (updateMedic) {
            // Update the quantity in stock
            updateMedic.quantityInStock += quantityInStock;
            // Save the updated medicine
            await updateMedic.save();
            res.status(200).json({ success: true, data: updateMedic, message: "Medicine Updated successfully" });
        } else {
            // If medicine not found, create new
            const newMedicine = await medicine_model.create(req.body);
            res.status(201).json({ success: true, data: newMedicine, message: "Medicine Added successfully" });
        }
    } catch (error) {
        next(error);
    }
}
export const allMedicine= async(req,res,next) => {
    try {
        const allMedicines = await medicine_model.find({});
        res.status(200).json({success:true, data:allMedicines});
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
