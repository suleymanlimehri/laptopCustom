import express from 'express';
import auth from '../middleware/auth.js';
import {
  createOrder,
  getAllOrders,
  deleteOrder,
  cancelOrder,
  getUserOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/my', auth, getUserOrders);
router.put('/cancel/:id', cancelOrder);
router.put('/status/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
