import express from 'express';
import Offer from '../models/Offer.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { productId, offerPrice, userId, userName, userEmail } = req.body;

    if (!productId || !offerPrice) {
      return res.status(400).json({ message: 'Product and offer price required' });
    }

    const newOffer = new Offer({
      productId,
      offerPrice,
      userId,
      userName,
      userEmail
    });

    await newOffer.save();
    res.status(201).json({ message: 'Offer created', offer: newOffer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate('productId', 'name price image')
      .populate('userId', 'username email');
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
