import mongoose from'mongoose' ;

const OutflowSchema = new mongoose.Schema({

   
     medicine:{
        type: String,
        required: false
    },
    OutflowDate: {
        type: Date,
        required: false
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
    }

 
    
});

const Outflow = mongoose.model('Sales', OutflowSchema);

export default Outflow;