import express from 'express';
import { 
  getAllProducts, 
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
