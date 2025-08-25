import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
    quantity: { type: Number, default: 1 },
    selectedOptions: { type: Map, of: String },
    price: { type: Number }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [itemSchema],
    shippingAddress: { type: String },
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
