import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import configure from './src/configs/index.js';

const app = express();
app.use(express.json());

mongoose.connect(configure.MONGODB_CONNECTION)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(configure.PORT, () => 
    console.log(`Server is live on port ${configure.PORT}!!`));
})
