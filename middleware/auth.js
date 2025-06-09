require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== `Bearer ${process.env.API_KEY}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;