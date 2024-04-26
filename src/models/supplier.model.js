import {model, Schema} from 'mongoose';

const supplierSchema = new Schema({
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

const supplier_model= model('Supplier', supplierSchema);
export default supplier_model;