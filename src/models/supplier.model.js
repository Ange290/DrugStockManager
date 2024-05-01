import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
 },
 contact: {
    type: String,
    required: true
 },
 address: {
    type: String,
    required: true
 }
});

const supplier_model= mongoose.model('Supplier', supplierSchema);
export default supplier_model;