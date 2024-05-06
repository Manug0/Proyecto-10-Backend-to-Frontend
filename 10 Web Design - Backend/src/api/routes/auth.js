const uploadFile = require("../../middlewares/uploadFile");
const { registerUser, loginUser } = require("../controllers/auth");

const authRouter = require("express").Router();

const uploadConsole = uploadFile("users");

authRouter.post("/register", uploadConsole.single("profilePic"), registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
