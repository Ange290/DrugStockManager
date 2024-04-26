import medicine_route from "./medicine.route.js";
import supplier_route from "./supplier.route.js";
import express from "express";

const router = express.Router();
router.use('/medicine',medicine_route);
router.use('/supplier',supplier_route);

export default router;