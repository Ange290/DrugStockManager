import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import configure from './src/configs/index.js';
import all_routes from './src/routes/medicine.route.js'

const app = express();
app.use(express.json());
app.use('/api/medicine',all_routes);

mongoose.connect(configure.MONGODB_CONNECTION)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(configure.PORT, () => 
    console.log(`Server is live on port ${configure.PORT}!!`));
})
