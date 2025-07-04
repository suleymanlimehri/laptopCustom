import Category from '../models/Category.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error getting categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: 'Name is required' });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Category already exists' });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating category' });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ msg: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting category' });
  }
};
