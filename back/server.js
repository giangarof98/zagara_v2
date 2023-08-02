import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
connectDB();

import express from 'express';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const port = process.env.PORT || 80000;
const app = express();

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req,res) => {
    res.send('api running...')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes)

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`running on port ${port}`))