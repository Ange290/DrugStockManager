import {Schema, model} from 'mongoose';

const CropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plantingDate: {
    type: Date,
  },
  harvestDate: {
    type: Date,
  },
  yield: {
    type: Number,
  },
});

module.exports = mongoose.model('Crop', CropSchema);