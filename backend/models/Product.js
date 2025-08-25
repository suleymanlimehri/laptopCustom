import mongoose from 'mongoose';

const extraPricesSchema = new mongoose.Schema(
  {
    color:    { type: Map, of: Number },
    ram:      { type: Map, of: Number },
    storage:  { type: Map, of: Number },
    gpu:      { type: Map, of: Number },
    os:       { type: Map, of: Number },
    keyboard: { type: Map, of: Number },
    display:  { type: Map, of: Number }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    description: { type: String },
    price:       { type: Number, required: true },
    image:       { type: String },
    hoverImage: { type: String },
    stock:       { type: Number },
    category:    { type: String, default: 'Uncategorized' },
    extraPrices: extraPricesSchema
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
