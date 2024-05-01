import stock_route from "./stock.route.js";
import supplier_route from "./supplier.route.js";
import medicine_route from "./medicine.route.js";
import order_route from "./order.route.js";
import sale_route from "./sale.route.js";
import express from "express";

const router = express.Router();
router.use('/stock',stock_route);
router.use('/medicine',medicine_route);
router.use('/supplier',supplier_route);
router.use('/order',order_route);
router.use('/sale',sale_route);

export default router;