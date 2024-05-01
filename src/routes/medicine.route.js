
import express from 'express';
const medicine_route = express.Router();
import {createMedicine,getMedicineById,getMedicines,updateMedicine} from '../controllers/medicine.controller.js'

// Create a new medicine
medicine_route.post('/add', createMedicine);

// Get all medicines
medicine_route.get('/list',getMedicines);

// Get a medicine by ID
medicine_route.get('/get/:medicineId', getMedicineById);

// Update a medicine by ID
medicine_route.put('/update/:medicineId',updateMedicine);

// Delete a medicine by ID (consider adding authentication for this)
//medicine_route.delete('/delete/:medicineId',deleteMedicine);

export default medicine_route;
