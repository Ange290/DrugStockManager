import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    medicine: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        quantity: {
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
    }],
    supplier: {
        type: mongoose.Types.ObjectId,
        ref: 'Supplier',
        required: false
    },
    Date:{
    orderDate:{
type:String,
required:false
    },
    deriveryDate:{
 type:String,
 required:false
    },
},
status: {
    type: String,
    enum: ['pending', 'supplied', 'delayed'],
    default: 'pending'
},
  
});

const Order = mongoose.model('Order', orderSchema);

export default Order;