import express from 'express';
const supplier_route = express.Router();
 import { addSupplier, getSupplierById, getSuppliers, updateSupplier, deleteSupplier } from '../controllers/supplier.controller.js';

 supplier_route.post('/add', addSupplier);
 supplier_route.get('/list',getSuppliers);
 supplier_route.get('/getbyid',getSupplierById);
 supplier_route.patch('/update',updateSupplier);
 supplier_route.delete('/delete',deleteSupplier);
 export default   supplier_route;