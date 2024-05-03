import express from 'express';
const stock_route = express.Router();
 import { updateStock,allStock ,deleteStock, getStockById} from '../controllers/stock.controller.js';
 //import setDate from '../utils/helperfunction.js';

stock_route.patch('/add/:medicine',updateStock);
 stock_route.get('/list',allStock);
 stock_route.delete('/delete/:id',deleteStock);
 stock_route.get('/get/:id',getStockById);
export default   stock_route;