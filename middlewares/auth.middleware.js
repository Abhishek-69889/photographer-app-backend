const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
