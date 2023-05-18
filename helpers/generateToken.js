const jwt = require("jsonwebtoken");

const generateToken = (info) => {
    return jwt.sign({ ...info }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = generateToken;
