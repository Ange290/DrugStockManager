import mongoose from'mongoose' ;

const OutflowSchema = new mongoose.Schema({
    medicines: [{
        medicineId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    name:{
        type: String,
        required: true
    }
    }],
    quantity: [{
        type: Number,
        required: true
    }],
    unitOfMeasure:{
        type: String,
        required: true,
        enum:{
            values:['Kilogram','Gram','Litre','Millilitre','Piece','Box','Pallet','Dozen','Unit'],
            message:"{VALUES}is not valid measurement"
     }
    },
    OutflowDate: {
        type: Date,
        required: true
    },
    
}, { timestamps: true });

const Outflow = mongoose.model('Sales', OutflowSchema);

export default Outflow;