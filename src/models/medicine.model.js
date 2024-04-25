import {get, model, Schema} from 'mongoose';

const medicineSchema = new Schema({
    name: { 
        type: String, 
        required: true
     },
    batchNo: {
         type: String,
          required: true 
        },
    expiredDate: { 
        type:String, 
        required: true
 },
    quantityInStock: { 
        type: Number, 
        required: true },
        measure:{
            type: String,
            required: true
        },
        suppliers: [{
            type: Schema.Types.ObjectId,
            ref: 'Supplier'
         }]
   });
   
   const medicine_model = model('Medicine', medicineSchema);

export default medicine_model;