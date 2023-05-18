const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        user_image: {
            type: String,
            default: "",
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            default: "user",
        },
        profession: {
            type: String,
            required: true,
        },
        isblocked: {
            type: Boolean,
            default: false,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        stripe_account_id: String,
        stripe_seller: {},
        stripeSession: {},
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
