const jwt = require("jsonwebtoken");
const { createError } = require("./errorHandler");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(createError(401, "Token is not valid!"));
            req.user = user;
            next();
        });
    } else {
        return next(createError(401, "You are not authenticated!"));
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.roles === "admin") {
            next();
        } else {
            return next(createError(403, "You are not allowed to do that!"));
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roles === "admin") {
            next();
        } else {
            return next(createError(403, "You are not allowed to do that!"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
