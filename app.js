import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import configure from './src/configs/index.js';
import all_routes from './src/routes/allroute.js';
import swagger from './src/docs/swagger.json' assert{type:"json"};

const app = express();
app.use(express.json());
app.use('/ange',swaggerUi.serve,swaggerUi.setup(swagger));

app.use('/api/',all_routes);

mongoose.connect(configure.MONGODB_CONNECTION)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(configure.PORT, () => 
    console.log(`Server is live on port ${configure.PORT}!!`));
})
