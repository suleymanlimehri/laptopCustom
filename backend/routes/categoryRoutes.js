import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCategories);

const checkAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).json({ msg: 'Only admins can create categories' });
  next();
};

router.post('/create', auth, checkAdmin, createCategory);
router.delete('/:id', auth, checkAdmin, deleteCategory);

export default router;
