import express from 'express';
const medicine_route = express.Router();
 import { updateMedicine, allMedicine } from '../controllers/medicine.controller.js';
 //import setDate from '../utils/helperfunction.js';

 medicine_route.post('/add-or-update/:name',updateMedicine);
 medicine_route.get('/get',allMedicine);
export default   medicine_route;