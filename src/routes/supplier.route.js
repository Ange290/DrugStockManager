import express from 'express';
const supplier_route = express.Router();
 import { addSupplier, getSupplierById, getSuppliers, updateSupplier, deleteSupplier } from '../controllers/supplier.controller.js';

 supplier_route.post('/add', addSupplier);
 supplier_route.get('/list',getSuppliers);
 supplier_route.get('/getbyid/:id',getSupplierById);
 supplier_route.patch('/update/:id',updateSupplier);
 supplier_route.delete('/delete/:id',deleteSupplier);
 export default   supplier_route;