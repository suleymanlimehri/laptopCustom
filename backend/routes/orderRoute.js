import {
  createOrder,
  getAllOrders,
  deleteOrder,
  cancelOrder,
  getUserOrders,
} from '../controllers/orderController.js';
import express from "express"
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/my', auth, getUserOrders);
router.put('/cancel/:id', cancelOrder);
router.delete('/:id', deleteOrder);  

export default router;