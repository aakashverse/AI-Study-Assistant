const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Duplicate key (e.g., email already exists)
  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already registered" });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;