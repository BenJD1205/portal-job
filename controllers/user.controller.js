const User = require("../models/user.model");
const { createError } = require("../middlewares/errorHandler");
const generateToken = require("../helpers/generateToken");
const { validateMongoDbId } = require("../utils/common-function");

const register = async (req, res, next) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) return next(createError(400, "User has been existed!"));
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.isPasswordMatched(password)) {
        res.status(200).json({
            message: "Login successfully!",
            success: true,
            token: generateToken({ id: user._id, roles: user.roles }),
            username: user?.firstname + " " + user?.lastname,
            role: user?.roles,
            user_image: user?.user_image,
        });
    }
};

const getAllUser = async (req, res, next) => {
    const users = await User.find().select("-__v -password");
    res.status(200).json({
        success: true,
        message: "Get all user successfully",
        data: users,
    });
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.json({
        message: "Update user successfully",
        success: true,
        data: updatedUser,
    });
};

const updateProfile = async (req, res, next) => {
    const { id } = req.user;
    validateMongoDbId(id);
    const update = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
        message: "Update profile successfully",
        success: true,
        data: update,
    });
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);
    await User.findByIdAndDelete(id);
    res.json({
        message: "User has been deleted successfully",
    });
};

module.exports = {
    register,
    login,
    getAllUser,
    updateUser,
    updateProfile,
    deleteUser,
};
