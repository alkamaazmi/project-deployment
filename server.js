import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//rest object
const app=express();

//configure env
dotenv.config();

//connect to database
connectDb();


//midleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product",productRoutes);

app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
//PORT
const PORT=process.env.PORT||8080;

//run listen
app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
})