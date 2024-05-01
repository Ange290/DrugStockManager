
import Order from '../models/order.model.js';
import Supplier from '../models/supplier.model.js'; // Assuming your supplier model path

export const createOrder = async (req, res, next) => {
  try {
    const { medicine, supplier, status } = req.body;

    // Validate supplier existence
    
    const suppliers = await Supplier.findById(supplier);
    if (!suppliers) {
      return res.status(400).json({ message: "Supplier with the provided ID not found" });
    }

    // Create a new order
    const newOrder = new Order({ medicine, supplier: supplier, status });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      data: savedOrder
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('supplier'); // Populate the supplier details
    res.status(200).json({
      message: 'Orders retrieved successfully',
      data: orders
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('supplier'); // Populate the supplier details

    if (!order) {
      return res.status(404).json({ message: "Order with the provided ID not found" });
    }

    res.status(200).json({
      message: 'Order retrieved successfully',
      data: order
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { medicine, supplierId, status } = req.body;

    // Validate supplier existence (optional, depending on your logic)
    const supplier = await Supplier.findById(supplierId);
    if (!supplier && supplierId) { // Check only if supplierId is provided
      return res.status(400).json({ message: "Supplier with the provided ID not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { medicine, supplier: supplierId, status },
      { new: true } // Return the updated order document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order with the provided ID not found" });
    }

    res.status(200).json({
      message: 'Order updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order with the provided ID not found" });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      data: deletedOrder
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};