const uploadUser = require("../../middlewares/userFile");
const { registerUser, loginUser } = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/register", uploadUser.single("profilePic"), registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
