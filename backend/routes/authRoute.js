import express from 'express';
import User from '../models/User.js';
import {
  register,
  login,
  googleLogin,
  getProfile
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

router.get('/all', auth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password -googleId');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error getting users' });
  }
});

router.put('/changerole/:id', auth, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password -googleId');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error changing role' });
  }
});

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/profile', auth, getProfile);
router.put('/block/:id', auth, requireAdmin, async (req, res) => {
  try {
    const { isBlocked } = req.body;

    if (typeof isBlocked !== 'boolean') {
      return res.status(400).json({ msg: 'isBlocked must be true or false' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked },
      { new: true }
    ).select('-password -googleId');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating block status' });
  }
});


export default router;
