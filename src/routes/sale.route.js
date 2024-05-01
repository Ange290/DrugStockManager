import express from'express';
const sale_route = express.Router();

import { createOutflow } from'../controllers/sales.controller.js'; // Assuming your controller path

sale_route.post('/add', createOutflow);
export default sale_route;