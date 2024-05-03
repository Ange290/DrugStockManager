import express from'express';
const sale_route = express.Router();

import { createOutflow, listSale, deleteSale } from'../controllers/sales.controller.js'; // Assuming your controller path


sale_route.patch('/update/:medicine', createOutflow);
sale_route.get('/list', listSale);
sale_route.delete('/delete/:id', deleteSale);
export default sale_route;