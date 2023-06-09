const { RateLimiterMemory } = require("rate-limiter-flexible");
const { rateLimiterOptions } = require("../utils/_var");
const TOO_MANY_REQUESTS_MESSAGE = "Too many requests";
const rateLimiter = new RateLimiterMemory(rateLimiterOptions);

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then((rateLimiterRes) => {
            res.setHeader("Retry-After", rateLimiterRes.msBeforeNext / 1000);
            res.setHeader("X-RateLimit-Limit", 100);
            res.setHeader(
                "X-RateLimit-Remaining",
                rateLimiterRes.remainingPoints
            );
            res.setHeader(
                "X-RateLimit-Reset",
                new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString()
            );
            next();
        })
        .catch(() => {
            res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
        });
};

module.exports = rateLimiterMiddleware;
