import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    role:     { type: String, enum: ['user', 'admin'], default: 'user' },
    address:  { type: String, default: '' },
    profileImage: { type: String, default: '' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
