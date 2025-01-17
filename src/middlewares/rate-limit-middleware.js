const rateLimiter = require("express-rate-limit");

const RateLimiter = (maxRequests, time) => {
  return rateLimiter({
    max: maxRequests,
    windowMs: time,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = RateLimiter;
