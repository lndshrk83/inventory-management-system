import express from 'express';
import { 
  getAllSuppliers, 
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '../controllers/suppliersController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', protect, createSupplier);
router.put('/:id', protect, updateSupplier);
router.delete('/:id', protect, deleteSupplier);

export default router;
