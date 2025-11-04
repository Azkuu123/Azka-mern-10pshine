// backend/middlewares/errorHandler.js

const logger = require("../logger");
const errorHandler = (err, req, res, next) => {
  logger.error(
    { error: err.message, stack: err.stack },
    "🔥 Exception occurred"
  );

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    error: true,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;