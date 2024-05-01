
import express from 'express';
const order_route = express.Router();
import { createOrder,getOrderById,getOrders,updateOrder,deleteOrder } from "../controllers/order.controller.js";

order_route.post('/add',createOrder);

order_route.get('/list',getOrders);

order_route.get('/getbyid/:id',getOrderById);

order_route.patch('/update/:id',updateOrder);

order_route.delete('/delete/:id',deleteOrder);

export default   order_route;