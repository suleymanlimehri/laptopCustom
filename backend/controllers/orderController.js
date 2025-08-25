import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: 'Order must contain at least one item' });
    }

    // Validate and clean items
    const cleanedItems = [];
    for (const item of items) {
      const productId = item.product?._id ?? item.product;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ msg: `Product not found for ID: ${productId}` });
      }

      cleanedItems.push({
        product: productId,
        quantity: item.quantity,
        price: item.price,
        selectedOptions: item.selectedOptions
      });
    }

    const newOrder = new Order({
      user: userId,
      items: cleanedItems,
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
      .populate('user', 'username email')
      .populate('items.product', 'name price image');

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
    )
      .populate('user', 'username email')
      .populate('items.product', 'name price image');

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
    const orders = await Order.find({ user: userId })
      .populate('items.product', 'name price image');
    res.json(orders);
  } catch (err) {
    console.error('GET USER ORDERS ERROR:', err);
    res.status(500).json({ msg: 'Error getting orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('user', 'username email')
      .populate('items.product', 'name price image');

    if (!updated) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('UPDATE ORDER STATUS ERROR:', err);
    res.status(500).json({ msg: 'Error updating order status' });
  }
};
