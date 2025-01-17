const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userInfo = decodeToken;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. Invaild toekn!",
    });
  }
};

module.exports = authMiddleWare;
