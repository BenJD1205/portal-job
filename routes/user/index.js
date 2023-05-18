const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
    register,
    login,
    getAllUser,
    updateUser,
    updateProfile,
    deleteUser,
} = require("../../controllers/user.controller");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../../middlewares/verifyPermission");

router.post("/register", asyncHandler(register));

router.post("/login", asyncHandler(login));

router.put(
    "/profile",
    verifyTokenAndAuthorization,
    asyncHandler(updateProfile)
);

router.use(verifyTokenAndAdmin);
router.get("/all", asyncHandler(getAllUser));

router.put("/update/:id", asyncHandler(updateUser));

router.delete("/delete/:id", asyncHandler(deleteUser));

module.exports = router;
