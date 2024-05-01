import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
       },
    batchNo: {
         type: String,
          required: false 
        },
    manufactDate:{
           type: String,
            required: false
        },
    expiredDate: { 
            type:String, 
            required: false
        },
    quantityInStock: { 
            type: Number, 
            required:false 
        },
    unitOfMeasure:{
            type: String,
            required: false,
            enum:{
                values:['Kilogram','Gram','Litre','Millilitre','Piece','Box','Pallet','Dozen','Unit'],
                message:"{VALUES}is not valid measurement"
         }
        },
        supply: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: false
         }]

   });
   
   const medicine_model = mongoose.model('Medicine', medicineSchema);

export default medicine_model;