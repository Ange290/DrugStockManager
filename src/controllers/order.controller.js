
import Order from '../models/order.model.js';
import Supplier from '../models/supplier.model.js';
import {NotFoundError, BadRequestError} from '../errors/index.js';
import { validationResult } from 'express-validator';
import asyncWrapper from '../middlewares/async.js';

export const createOrder = asyncWrapper( async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
next( new BadRequestError(errors.array()[0].msg));
  }
    const { medicine, supplier, status } = req.body;
const suppliers = await Supplier.findById(supplier);
    if (!suppliers) {
      return next( new NotFoundError("Supplier with the provided ID not found" ));
    }

    // Create a new order
    const newOrder = new Order({ medicine, supplier: supplier, status });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      data: savedOrder
    });
 
});

export const getOrders = asyncWrapper( async (req, res, next) => {
  
    const orders = await Order.find().populate('supplier'); // Populate the supplier details
    res.status(200).json({
      message: 'Orders retrieved successfully',
      data: orders
    });

});

export const getOrderById = asyncWrapper( async (req, res, next) => {
 
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('supplier'); // Populate the supplier details

    if (!order) {
      return next(new NotFoundError( "Order with the provided ID not found"));
    }

    res.status(200).json({
      message: 'Order retrieved successfully',
      data: order
    });

});

export const updateOrder =  asyncWrapper(async (req, res, next) => {
 
    const orderId = req.params.id;
    const { medicine, supplierId, status } = req.body;

    // Validate supplier existence (optional, depending on your logic)
    const supplier = await Supplier.findById(supplierId);
    if (!supplier && supplierId) { // Check only if supplierId is provided
      return next(new NotFoundError( "Supplier with the provided ID not found" ));
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { medicine, supplier: supplierId, status },
      { new: true } // Return the updated order document
    );

    if (!updatedOrder) {
      return next(new NotFoundError("Order with the provided ID not found" ));
    }

    res.status(200).json({
      message: 'Order updated successfully',
      data: updatedOrder
    });
  
});

export const deleteOrder = asyncWrapper( async (req, res, next) => {
 
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return next(new NotFoundError("Order with the provided ID not found" ));
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      data: deletedOrder
    });
 
});