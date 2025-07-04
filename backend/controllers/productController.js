import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error getting products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error getting product' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, extraPrices, stock, category } = req.body;
    const newProduct = new Product({ name, description, price, image, extraPrices, stock, category });


    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting product' });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, extraPrices, stock, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, extraPrices, stock, category },
      { new: true }
    );


    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating product' });
  }
};
