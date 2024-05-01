import express from 'express';
const stock_route = express.Router();
 import { updateStock,allStock } from '../controllers/stock.controller.js';
 //import setDate from '../utils/helperfunction.js';

stock_route.put('/add',updateStock);
 stock_route.get('/get',allStock);
export default   stock_route;