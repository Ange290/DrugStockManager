import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
   
    medicine:{
          type:  String,
          required: false,
        },
    supplyDate: {
          type: Date,
          required:false
        },
    quantityInStock: { 
            type: Number, 
            required: false 
        },
    unitOfMeasure:{
            type: String,
            required: false,
            enum:{
                values:['Kilogram','Gram','Litre','Millilitre','Piece','Box','Pallet','Dozen','Unit'],
                message:"{VALUES}is not valid measurement"
         }
        },


   });
   
   const stock_model = mongoose.model('Stock', stockSchema);
    
export default stock_model;