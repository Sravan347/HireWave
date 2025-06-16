const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Routes Middleware (checks cookie-based token)
const protectRoute = async (req, res, next) => {
  let token;

  // ✅ Check if token exists in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;

    try {
      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach user object to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found. Unauthorized." });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized. Invalid token." });
    }
  } else {
    return res.status(401).json({ message: "Not authorized. No token in cookie." });
  }
};

// Role-based Access Middleware
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Unauthorized role." });
    }
    next();
  };
};

module.exports = {
  protectRoute,
  restrictTo,
};
