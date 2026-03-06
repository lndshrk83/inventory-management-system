import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './src/routes/products.js';
import suppliersRouter from './src/routes/suppliers.js';
import authRouter from './src/routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Inventory Management System API is running');
});

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
