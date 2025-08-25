import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import orderRoutes from './routes/orderRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import chatRoutes from './routes/chatRoute.js';
import offerRoutes from './routes/offers.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
   origin:'http://localhost:5173',    
  methods: 'GET,POST,PUT,DELETE',   
  allowedHeaders: 'Content-Type,Authorization',  
  credentials: true,  
};
app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`) 
    );
  })
  .catch(err => console.log(err));
