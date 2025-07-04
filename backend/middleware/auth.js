import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Token not provided or invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ msg: 'Invalid token' });
  }

}



