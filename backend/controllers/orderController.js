import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ msg: `Product not found for ID: ${item.product} `});
      }
    }

    const newOrder = new Order({
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      status: 'pending'
    });

    await newOrder.save();

    res.status(201).json(newOrder);

  } catch (err) {
    console.error('CREATE ORDER ERROR:', err);
    res.status(500).json({ msg: 'Error creating order' });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.product'); 


    return res.json(orders);
  } catch (err) {
    console.error('GET ALL ORDERS ERROR:', err);
    res.status(500).json({ msg: 'Error getting orders' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json({ msg: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting order' });
  }
};
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error cancelling order' });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error('GET USER ORDERS ERROR:', err);
    res.status(500).json({ msg: 'Error getting orders' });
  }
};